const User = require("../../models/user");
const Cart = require("../../models/cart");
const Order = require("../../models/orders");

const { singleUser, singleMobile, transformMobile } = require("./merge");

module.exports = {
  addToCart: (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Not Authorized");
    // }
    const selectedMobile = args.mobile;
    return Cart.findOne({ mobileId: selectedMobile._id, userId: req.userId })
      .then(cart => {
        console.log('carttttt', cart)
        if (cart || cart != null) {
          cart.quantity = cart.quantity + 1;
          return cart.save().then(res => {
            console.log(res);
            return {
              ...res._doc,
              _id: res._doc._id.toString(),
              userId: singleUser.bind(this, res._doc.userId),
              mobileId: singleMobile.bind(this, res._doc.mobileId)
            };
          });
        } else {
          const newCart = new Cart({
            userId: req.userId,
            mobileId: selectedMobile._id,
            quantity: 1
          });
          return newCart.save().then(res => {
            return User.findById(req.userId)
              .then(user => {
                user.cart.push(res);
                return user.save().then(result => {
                  return {
                    ...res._doc,
                    _id: res._doc._id.toString(),
                    userId: singleUser.bind(this, res._doc.userId),
                    mobileId: singleMobile.bind(this, res._doc.mobileId)
                  };
                });
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
      })
      .catch(err => {
        throw new Error("Error in server: Carts can not be fetched");
      });
  },

  removeCart: (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Not Authorized");
    // }
    const cartId = args.cartId;
    return Cart.findById(cartId)
      .populate("mobileId")
      .then(cart => {
        return Cart.deleteOne({ _id: cartId })
          .then(res => {
            return User.findById(req.userId).populate('cart').then(user => {
              user.cart.pull(cart);
              return user.save().then(result => {
                return result.cart.map(ca => {
                  return {
                    ...ca._doc,
                    _id: ca._doc._id.toString(),
                    userId: singleUser.bind(this, ca._doc.userId),
                    mobileId: singleMobile.bind(this, ca._doc.mobileId)
                  };
                });
              });
            });
          })
          .catch(err => {
            throw new Error("can not remove cart");
          });
      })
      .catch(err => {
        throw new Error("Can not remove Cart");
      });
  },

  clearCart: (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Not Authorized");
    // }
    return Cart.deleteMany({ userId: req.userId }).then(res => {
      return User.findById(req.userId)
        .then(user => {
          user.cart = [];
          return user.save().then(result => {
            return {
              ...result._doc,
              _id: result._doc._id.toString(),
              password: null,
              cart: []
            };
          });
        })
        .catch(err => {
          throw new Error("can not clear cart");
        });
    });
  },

  incrementItemToCart: (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Not Authorized");
    // }
    const cartId = args.cartId;
    const cartQuantity = args.cartQuantity;
    return Cart.findById(cartId)
      .then(cart => {
        cart.quantity = cartQuantity + 1;
        return cart.save().then(res => {
          return {
            ...res._doc,
            _id: res._doc._id.toString(),
            userId: singleUser.bind(this, res._doc.userId),
            mobileId: singleMobile.bind(this, res._doc.mobileId)
          };
        });
      })
      .catch(err => {
        throw new Error("Unable to increment Cart");
      });
  },

  decrementItemToCart: (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Not Authorized");
    // }
    const cartId = args.cartId;
    const cartQuantity = args.cartQuantity;
    return Cart.findById(cartId)
      .then(cart => {
        cart.quantity = cartQuantity - 1;
        return cart.save().then(res => {
          if (res.quantity <= 0) {
            return Cart.findByIdAndDelete(cartId).then(cart => {
              return User.findById(req.userId)
                .then(user => {
                  user.cart.pull(cartId);
                  return user.save().then(result => {
                    return {
                      message: "Cart Removed!"
                    };
                  });
                })
                .catch(err => {
                  throw new Error("Unable to decrement cart");
                });
            });
          }
          return {
            ...res._doc,
            _id: res._doc._id.toString(),
            userId: singleUser.bind(this, res._doc.userId),
            mobileId: singleMobile.bind(this, res._doc.mobileId),
            message: "Cart Decreased By One!"
          };
        });
      })
      .catch(err => {
        throw new Error("Unable to fetch Cart");
      });
  },

  cart: (args) => {
    // if (!req.isAuth) {
    //   throw new Error("UnAuthorized");
    // }
    const userId = args.userId;
    return Cart.find({ userId: userId })
      .then(carts => {
        return carts.map(cart => {
          return {
            ...cart._doc,
            _id: cart._doc._id.toString(),
            userId: singleUser.bind(this, cart._doc.userId),
            mobileId: singleMobile.bind(this, cart._doc.mobileId)
          };
        });
      })
      .catch(err => {
        throw new Error("unable to fetch carts");
      });
  },

  createOrder: (args, req) => {
    // if (req.userId === null) {
    //   throw new Error(" Not Authorized");
    // }
    return Cart.find({ userId: req.userId })
      .populate("mobileId")
      .then(carts => {
        return carts.map(cart => {
          const allOrderedMobiles = {
            mobile: { ...cart.mobileId._doc },
            quantity: cart.quantity
          };
          return allOrderedMobiles;
        });
      })
      .then(result => {
        const order = new Order({
          order: result,
          userId: req.userId
        });
        return order.save().then(res => {
          return User.findById(req.userId)
            .then(user => {
              user.orders.push(res);
              user.cart = [];
              return user.save().then(resData => {
                return Cart.deleteMany({ userId: req.userId })
                  .then(c => {
                    return {
                      ...res._doc,
                      _id: res._doc._id.toString(),
                      userId: singleUser.bind(this, res._doc.userId),
                      createdAt: new Date(
                        res._doc.createdAt
                      ).toLocaleDateString(),
                      updatedAt: new Date(
                        res._doc.updatedAt
                      ).toLocaleDateString()
                    };
                  })
                  .catch(err => {
                    throw new Error("Unable to complete order creation");
                  });
              });
            })
            .catch(err => {
              throw new Error("Not Authorized");
            });
        });
      })
      .catch(err => {
        throw new Error("Unable to complete order creation");
      });
  },

  orders: (args, req) => {
    // if (!req.isAuth) {
    //     throw new Error('UnAuthorized');
    // }
    return Order.find({ userId: args.userId })
      .then(orders => {
        return orders.map(order => {
          return {
            ...order._doc,
            _id: order._doc._id.toString(),
            userId: singleUser.bind(this, order._doc.userId),
            createdAt: new Date(order._doc.createdAt).toLocaleDateString(),
            updatedAt: new Date(order._doc.updatedAt).toLocaleDateString()
          };
        });
      })
      .catch(err => {
        throw new Error("Unable to fetch orders");
      });
  }
};

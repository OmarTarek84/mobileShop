const User = require('../../models/user');
const Mobile = require('../../models/mobile');
const Cart = require('../../models/cart');
const Order = require('../../models/orders');

const DataLoader = require('dataloader');

const userLoader = new DataLoader((userIds) => {
    return User.find({_id: {$in: userIds}});
});

const mobileLoader = new DataLoader((mobileIds) => {
    return allMobiles(mobileIds);
});

const cartsLoader = new DataLoader((cartIds) => {
    return allCarts(cartIds);
});

const orderLoader = new DataLoader((orderIds) => {
    return allOrders(orderIds);
});

const transformMobile = mobile => {
    return {
        ...mobile._doc,
        _id: mobile._doc._id.toString(),
        createdAt: new Date(mobile._doc.createdAt).toLocaleDateString(),
        updatedAt: new Date(mobile._doc.updatedAt).toLocaleDateString(),
        userId: singleUser.bind(this, mobile._doc.userId)
    };
};

const singleUser = userId => {
    return userLoader.load(userId.toString()).then(user => {
        return {
            ...user._doc,
            _id: user._doc._id.toString(),
            createdMobiles: () => mobileLoader.loadMany(user._doc.createdMobiles),
            cart:  () => cartsLoader.loadMany(user._doc.cart),
            orders: () => orderLoader.loadMany(user._doc.orders)
        }
    })
};

const allOrders = orderIds => {
    return Order.find({_id: {$in: orderIds}}).then(orders => {
        return orders.map(order => {
            return {
                ...order._doc,
                _id: order._doc._id.toString(),
                userId: singleUser.bind(this, order._doc.userId),
                createdAt: new Date(order._doc.createdAt).toLocaleDateString(),
                updatedAt: new Date(order._doc.updatedAt).toLocaleDateString(),
            }
        });
    });
};

const singleOrder = orderId => {
    return orderLoader.load(orderId.toString()).then(order => {
        return order;
    })
};

const allMobiles = mobileIds => {
    return Mobile.find({_id: {$in: mobileIds}}).then(mobiles => {
        return mobiles.map(mobile => {
            return transformMobile(mobile);
        })
    })
}

const allCarts = cartIds => {
    return Cart.find({_id: {$in: cartIds}}).then(carts => {
        return carts.map(cart => {
            return {
                ...cart._doc,
                _id: cart._doc._id.toString(),
                userId: singleUser.bind(this, cart._doc.userId),
                mobileId: singleMobile.bind(this, cart._doc.mobileId)
            }
        })
    })
};

const singleCart = cartId => {
    return cartsLoader.load(cartId.toString()).then(cart => {
        return cart;
    });
};

const singleMobile = mobileId => {
    return mobileLoader.load(mobileId.toString()).then(mobile => {
        return mobile;
    })
};

exports.transformMobile = transformMobile;
exports.singleUser = singleUser;
exports.allMobiles = allMobiles;
exports.singleMobile = singleMobile;
exports.singleCart = singleCart;
exports.singleOrder = singleOrder;
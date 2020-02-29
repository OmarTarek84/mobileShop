import * as ActionTypes from "./ActionTypes";
import axios from "axios";

export const fetchCarts = () => {
  return async (dispatch, getState) => {
    const requestBody = {
      query: `
                      query Cart($userId: String) {
                          cart(userId: $userId) {
                              _id
                              mobileId {
                                  _id
                                  title
                                  imageUrl
                                  price
                              }
                              userId {
                                  _id
                                  email
                                  firstname
                                  lastname
                              }
                              quantity
                        }
                      }
                  `,
      variables: {
        userId: getState().auth.userId
      }
    };
    let price = 0;
    getState().carts.carts.forEach(car => {
      price += +car.mobileId.price * car.quantity;
    });
    if (
      getState().carts.carts.length <= 0 ||
      getState().carts.totalPrice != price
    ) {
      try {
        const response = await axios.post(
          "http://localhost:8080/graphql",
          JSON.stringify(requestBody),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getState().auth.token
            }
          }
        );
        let price = 0;
        response.data.data.cart.forEach(car => {
          price += +car.mobileId.price * car.quantity;
        });
        console.log(response);
        dispatch({
          type: ActionTypes.FETCH_CARTS,
          carts: response.data.data.cart,
          totalPrice: price
        });
      } catch (err) {
        throw err;
      }
    }
  };
};

const increaseQuantityByOne = id => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.INCREASE_CART_QUANTITY_BY_ONE,
      id: id
    });
  };
};

const decreaseQuantityByOne = id => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.DECREASE_CART_QUANTITY_BY_ONE,
      id: id
    });
  };
};

export const incrementCartItem = id => {
  return async (dispatch, getState) => {
    const targetedItem = getState().carts.carts.find(cart => cart._id === id);
    const requestBody = {
      query: `
                mutation IncrementItemToCart($cartId: String!, $cartQuantity: Int!) {
                    incrementItemToCart(cartId: $cartId, cartQuantity: $cartQuantity) {
                        quantity
                        userId {
                          email
                        }
                        mobileId {
                          title
                          description
                          price
                        }
                      }
                }
            `,
      variables: {
        cartId: id,
        cartQuantity: targetedItem.quantity
      }
    };
    dispatch(increaseQuantityByOne(id));

    await axios.post(
      "http://localhost:8080/graphql",
      JSON.stringify(requestBody),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getState().auth.token
        }
      }
    );
  };
};

export const decrementCartItem = id => {
  return async (dispatch, getState) => {
    const targetedItem = getState().carts.carts.find(cart => cart._id === id);
    const requestBody = {
      query: `
      mutation DecrementItemToCart($cartId: String!, $cartQuantity: Int!) {
        decrementItemToCart(cartId: $cartId, cartQuantity: $cartQuantity) {
            quantity
            userId {
              email
            }
            mobileId {
              title
              description
              price
            }
          }
    }
            `,
      variables: {
        cartId: id,
        cartQuantity: targetedItem.quantity
      }
    };

    dispatch({
      type: ActionTypes.DECREASE_CART_QUANTITY_BY_ONE,
      id: id
    });

    await axios.post(
      "http://localhost:8080/graphql",
      JSON.stringify(requestBody),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getState().auth.token
        }
      }
    );
  };
};

export const addToCart = mobile => {
  return async (dispatch, getState) => {
    const requestBody = {
      query: `
                mutation AddToCart($mobile: AddedMobileToCartInput!) {
                    addToCart(mobile: $mobile) {
                      _id
                        mobileId {
                        _id
                        title
                        price
                        createdAt
                        updatedAt
                        imageUrl
                        }
                        quantity
                        userId {
                        _id
                        email
                        firstname
                        lastname
                        }
                    }
                }
            `,
      variables: {
        mobile: {
          _id: mobile._id,
          title: mobile.title,
          description: mobile.description,
          model: mobile.model,
          price: mobile.price,
          imageUrl: mobile.imageUrl
        }
      }
    };

    const response = await axios.post(
      "http://localhost:8080/graphql",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getState().auth.token
        }
      }
    );
    console.log("responseeee", response.data.data.addToCart);
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      cart: response.data.data.addToCart
    });
  };
};

export const removeCartItem = id => {
  return async (dispatch, getState) => {
    const requestBody = {
      query: `
                mutation RemoveCart($cartId: String!) {
                    removeCart(cartId: $cartId) {
                        _id
                        mobileId {
                            _id
                            title
                            imageUrl
                            price
                        }
                        userId {
                            _id
                            email
                            firstname
                            lastname
                        }
                        quantity
                      }
                }
            `,
      variables: {
        cartId: id
      }
    };
    dispatch({
      type: ActionTypes.REMOVE_ITEM_FROM_CART,
      cartId: id
    })
    await axios
      .post("http://localhost:8080/graphql", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getState().auth.token
        }
      });
  };
};

export const clearCart = () => {
  return async (dispatch, getState) => {
    const requestBody = {
      query: `
                mutation {
                    clearCart {
                    email
                    }
                }  
            `
    };
    dispatch({
      type: ActionTypes.CLEAR_CART
    })
    await axios
      .post("http://localhost:8080/graphql", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getState().auth.token
        }
      })
  }
}
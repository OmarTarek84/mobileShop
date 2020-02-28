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
    if (getState().carts.carts.length <= 0) {
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

    dispatch({
      type: ActionTypes.INCREMENT_CART,
      id: id
    });
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

    dispatch({
      type: ActionTypes.DECREMENT_CART,
      id: id
    });
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
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      cart: response.data.data.addToCart
    });
  };
};

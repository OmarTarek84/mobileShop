import * as ActionTypes from "./ActionTypes";
import axios from "axios";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const requestBody = {
      query: `
                      query Orders($userId: String) {
                          orders(userId: $userId) {
                              _id
                              order {
                                mobile {
                                  _id
                                  price
                                  title
                                }
                                quantity
                              }
                              userId {
                                firstname
                              }
                              createdAt
                            }
                      }
                  `,
      variables: {
        userId: getState().auth.userId
      }
    };
    if (getState().orders.orders.length <= 0) {
      try {
        const response = await axios.post(
          "/graphql",
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getState().auth.token
            }
          }
        );
        dispatch({
          type: ActionTypes.FETCH_ORDERS,
          orders: response.data.data.orders
        });
      } catch (err) {
        throw err;
      }
    }
  };
};

export const addOrder = () => {
  return async (dispatch, getState) => {
    const requestBody = {
      query: `
                  mutation {
                      createOrder {
                        _id
                        order {
                          mobile {
                            _id
                            price
                            title
                          }
                          quantity
                        }
                        userId {
                          firstname
                        }
                        createdAt
                      }
                    }
                  `
    };

    const response = await axios.post(
      "/graphql",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getState().auth.token
        }
      }
    );

    const ordersResult = response.data.data.createOrder;
    dispatch({
        type: ActionTypes.ADD_ORDER,
        order: ordersResult
    });
  };
};

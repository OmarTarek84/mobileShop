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
      dispatch({
        type: ActionTypes.FETCH_CARTS,
        carts: response.data.data.cart
      });
      // .catch(err => {
      //   console.log(err);
      //   setisLoading(false);
      //   setnoItemsInCart(true);
      //   setTimeout(() => {
      //     props.history.push("/authenticate");
      //   }, 4000);
      // });
    } catch (err) {
      throw err;
    }
  };
};

import axios from "axios";
import * as ActionTypes from "./ActionTypes";

export const fetchMobiles = () => {
  return async dispatch => {
    const requestBody = {
      query: `
            query {
                mobiles {
                  _id
                  title
                  description
                  price
                  model
                  imageUrl
                  createdAt
                  userId {
                    _id
                    firstname
                    lastname
                    email
                  }
                }
              }
            `
    };
    try {
      const resData = await axios.post(
        "http://localhost:8080/graphql",
        JSON.stringify(requestBody),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const mobiles = resData.data.data.mobiles;
      console.log(resData);
      dispatch({
        type: ActionTypes.FETCH_MOBILES,
        mobiles: mobiles
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createMobile = (title, description, price, model, file) => {
  return async (dispatch, getState) => {
    try {
      const formData = new FormData();
      formData.append("pic", file);
      console.log("fileee", file);
      const response1 = await fetch("http://localhost:8080/post-image", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + getState().auth.token
        },
        body: formData
      });
      const res1Json = await response1.json();
      console.log("file ==>>", res1Json);
      const requestBody = {
        query: `
                      mutation CreateMobile($title: String!, $description: String!, $price: Float!, $model: String!, $imageUrl: String!) {
                          createMobile(mobileInput: {
                              title: $title,
                              description: $description,
                              price: $price,
                              model: $model,
                              imageUrl: $imageUrl
                            }) {
                              _id
                              title
                              description
                              price
                              model
                              userId {
                                email
                                firstname
                                lastname
                              }
                              imageUrl
                              createdAt
                              updatedAt
                            }
                      }
                  `,
        variables: {
          title: title,
          description: description,
          price: price,
          model: model,
          imageUrl: res1Json.filePath
        }
      };
      const response2 = await axios.post(
        "http://localhost:8080/graphql",
        JSON.stringify(requestBody),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getState().auth.token
          }
        }
      );
      console.log("final response ==>> ", response2);
      dispatch({
        type: ActionTypes.CREATE_MOBILE,
        mobile: response2.data.data.createMobile
      });
    } catch (err1) {}
    // requestBody = {
    //   query: `
    //                     mutation EditMobile($mobileId: String!, $newMobile: MobileInput!) {
    //                         editMobile(mobileId: $mobileId, newMobile: $newMobile) {
    //                             _id
    //                             title
    //                             description
    //                             price
    //                             model
    //                             imageUrl
    //                             userId {
    //                                 _id
    //                                 firstname
    //                                 lastname
    //                                 email
    //                             }
    //                           }
    //                     }
    //                 `,
    //   variables: {
    //     mobileId: this.state.filteredMobile._id,
    //     newMobile: {
    //       title: this.state.createMobileForm.Title.value,
    //       description: this.state.createMobileForm.Description.value,
    //       price: +this.state.createMobileForm.Price.value,
    //       model: this.state.createMobileForm.Model.value,
    //       imageUrl: urlImg
    //     }
    //   }
    // };
  };

  // .then(resData => {
  //   console.log(resData);
  //   props.history.push("/");
  // })
  // .catch(err => {
  //   console.log(err);
  // });
};

import axios from "axios";
import * as ActionTypes from "./ActionTypes";

export const fetchMobiles = () => {
  return async (dispatch, getState) => {
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
    if (getState().mobiles.mobiles.length <= 1) {
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
        dispatch({
          type: ActionTypes.FETCH_MOBILES,
          mobiles: mobiles
        });
      } catch (err) {
        throw err;
      }
    } else {
      return null;
    }
  };
};

export const createMobile = (title, description, price, model, file) => {
  return async (dispatch, getState) => {
    try {
      let image;
      if (typeof(file) === 'string') {
        image = file;
      } else {
        const formData = new FormData();
        formData.append("pic", file);
        const response1 = await fetch("http://localhost:8080/post-image", {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + getState().auth.token
          },
          body: formData
        });
        const res1Json = await response1.json();
        image = res1Json.filePath;
      }
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
                                _id
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
          imageUrl: image
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
      dispatch({
        type: ActionTypes.CREATE_MOBILE,
        mobile: response2.data.data.createMobile
      });
    } catch (err1) {
      throw err1;
    }
  };
};

export const editMobileSocket = (id, title, description, price, model, imageUrl) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.EDIT_MOBILE,
      id: id,
      title: title,
      description: description,
      model: model,
      price: price,
      imageUrl: imageUrl
    });
  };
};

export const createMobileSocket = (mobile) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.CREATE_MOBILE,
      mobile: mobile
    });
  };
};

export const editMobile = (id, title, description, price, model, imageUrl) => {
  return async (dispatch, getState) => {
    try {
      let image;
      const formData = new FormData();
      if (typeof(imageUrl) === 'string') {
        image = imageUrl;
      } else {
        formData.append("pic", imageUrl);
        const response1 = await fetch("http://localhost:8080/post-image", {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + getState().auth.token
          },
          body: formData
        });
        const res1Json = await response1.json();
        image = res1Json.filePath;
      }
      const requestBody = {
        query: `
                          mutation EditMobile($mobileId: String!, $newMobile: MobileInput!) {
                              editMobile(mobileId: $mobileId, newMobile: $newMobile) {
                                  _id
                                  title
                                  description
                                  price
                                  model
                                  imageUrl
                                  userId {
                                      _id
                                      firstname
                                      lastname
                                      email
                                  }
                                  createdAt
                                  updatedAt
                                }
                          }
                      `,
        variables: {
          mobileId: id,
          newMobile: {
            title: title,
            description: description,
            price: price,
            model: model,
            imageUrl: image
          }
        }
      };
  
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

      const resData = response.data.data.editMobile;

      dispatch({
        type: ActionTypes.EDIT_MOBILE,
        id: id,
        title: resData.title,
        description: resData.description,
        model: resData.model,
        price: resData.price,
        imageUrl: resData.imageUrl
      });
    } catch(err) {
      throw err;
    }

  };
};

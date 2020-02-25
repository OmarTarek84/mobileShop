import React, { useState, useEffect } from "react";

import Input from "../../shared/Input/Input";
import Button from "../../components/UI/Button/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import queryString from "querystring";
import { useForm } from "../../components/Inputs/CreateMobileInput";
import "./CreateMobiles.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_ISNUMBER,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH
} from "../../shared/validators/Validators";

const createMobiles = props => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      price: {
        value: "",
        isValid: false
      },
      model: {
        value: "samsung",
        isValid: true
      }
    },
    false
  );
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);

  const [file, setFile] = useState(null);
  const [imageSelected, setImageSelected] = useState(null);
  const [mode, setMode] = useState('create');

  const fileChangeHandler = event => {
    const targetedFile = event.target.files[0];
    setFile(targetedFile);
    setImageSelected(URL.createObjectURL(targetedFile));
  };

  // componentDidMount() {
  //     let params = queryString.parse(this.props.location.search);
  //     for (let key in params) {
  //         if (params[key]) {
  //             const editedMobile = this.props.location.state.filteredMobile;
  //             const editForm = {...this.state.createMobileForm};
  //             const title = {...editForm['Title']};
  //             const description = {...editForm['Description']};
  //             const price = {...editForm['Price']};
  //             const model = {...editForm['Model']};
  //             title.value = editedMobile.title;
  //             title.valid = true;
  //             description.value = editedMobile.description;
  //             description.valid = true;
  //             price.value = editedMobile.price;
  //             price.valid = true;
  //             model.value = editedMobile.model;
  //             model.valid = true;
  //             editForm['Title'] = title;
  //             editForm['Description'] = description;
  //             editForm['Price'] = price;
  //             editForm['Model'] = model;
  //             this.setState({createMobileForm: editForm, mode: 'edit', filteredMobile: editedMobile});

  //         } else {
  //             this.setState({mode: 'create'});
  //         }
  //     }
  // }

  const onSubmitForm = event => {
    event.preventDefault();
    console.log(formState);
    const formData = new FormData();
    formData.append("pic", file);
    fetch("http://localhost:8080/post-image", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token
      },
      body: formData
    })
      .then(res => res.json())
      .then(fileResData => {
        const urlImg = fileResData.filePath;
        const title = formState.inputs.title.value;
        const description = formState.inputs.description.value
        const price = +formState.inputs.price.value;
        const model = formState.inputs.model.value;
        let requestBody;
        if (mode === "create") {
          requestBody = {
            query: `
                          mutation CreateMobile($title: String!, $description: String!, $price: Float!, $model: String!, $imageUrl: String!) {
                              createMobile(mobileInput: {
                                  title: $title,
                                  description: $description,
                                  price: $price,
                                  model: $model,
                                  imageUrl: $imageUrl
                                }) {
                                  title
                                  description
                                }
                          }
                      `,
            variables: {
              title: title,
              description: description,
              price: price,
              model: model,
              imageUrl: urlImg
            }
          };
        } else {
          requestBody = {
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
                                }
                          }
                      `,
            variables: {
              mobileId: this.state.filteredMobile._id,
              newMobile: {
                title: this.state.createMobileForm.Title.value,
                description: this.state.createMobileForm.Description.value,
                price: +this.state.createMobileForm.Price.value,
                model: this.state.createMobileForm.Model.value,
                imageUrl: urlImg
              }
            }
          };
        }

        return axios
          .post("http://localhost:8080/graphql", JSON.stringify(requestBody), {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
            }
          })
          .then(resData => {
            console.log(resData);
            props.history.push("/");
          })
          .catch(err => {
            console.log(err);
          });
      });
  };

  return (
    <div className="formParent">
      <h1>
        {/* {state.mode === "create"
          ? "Create A New Mobile Item"
          : "Edit Your Mobile"} */}
      </h1>
      <form
        className="login-form"
        onSubmit={onSubmitForm}
        encType="multipart/form-data"
      >
        <div className="form-control">
          <div className="inputParent">
            <Input
              element="input"
              id="title"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
          <div className="inputParent">
            <Input
              element="textarea"
              id="description"
              label="Description"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(150)]}
              onInput={inputHandler}
            />
          </div>
          <div className="inputParent">
            <Input
              element="input"
              id="price"
              type="number"
              label="Price"
              validators={[VALIDATOR_ISNUMBER(), VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
          <div className="inputParent">
            <Input
              element="select"
              id="model"
              label="Mobile Model"
              validators={[]}
              onInput={inputHandler}
              initialValue="samsung"
              initialValid={true}
            />
          </div>
          <div className="inputParent">
            <label htmlFor="mobile_Picture">Select Your Mobile Photo</label>
            <input
              id="mobile_Picture"
              type="file"
              label="Select Mobile Photo"
              onChange={fileChangeHandler}
              accept=".png, .jpg, .jpeg"
              name="pic"
            />
          </div>
        </div>
        {file ? (
          <div className="image-selected">
            <img src={imageSelected} alt="mobileImage" />
          </div>
        ) : null}
        <div className="submit-button">
          <Button
            type="submit"
            disabled={
              !formState.inputs.title.isValid ||
              !formState.inputs.description.isValid ||
              !formState.inputs.price.isValid ||
              !file
            }
          >
            {"Create New Mobile"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default createMobiles;

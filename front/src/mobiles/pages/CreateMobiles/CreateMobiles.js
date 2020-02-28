import React, { useState } from "react";

import Input from "../../../shared/forms/Input/Input";
import Button from "../../../shared/UI/Button/Button";
import {useDispatch } from "react-redux";
import { useForm } from "../../../shared/forms/UseForm/UseForm";
import "./CreateMobiles.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_ISNUMBER,
  VALIDATOR_MAXLENGTH
} from "../../../shared/forms/validators/Validators";
import * as ActionTypes from "../../../store/Actions/mobiles";
import ErrorModal from '../../../shared/UI/ErrorModal/ErrorModal';

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
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [imageSelected, setImageSelected] = useState(null);
  const [mobError, setmobError] = useState(false);
  const [mode, setMode] = useState("create");

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
    dispatch(
      ActionTypes.createMobile(
        formState.inputs.title.value,
        formState.inputs.description.value,
        +formState.inputs.price.value,
        formState.inputs.model.value,
        file
      )
    ).then(() => {
      props.history.push("/");
      setmobError('');
    })
    .catch(err => {
      console.log(err.response);
      setmobError(err);
    });
  };

  return (
    <>
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
    <ErrorModal
        open={!!mobError}
        onClose={() => setmobError("")}
        errorMessage={
          mobError.response &&
          mobError.response.data &&
          mobError.response.data.errors[0]
            ? mobError.response.data.errors[0].message
            : "Unknown Error, We'll fix it soon"
        }
        firstButton={true}
        firstButtonMethod={() => setmobError("")}
        firstButtonTitle="Try Again Now"
        secondButton={false}
      />
    </>
  );
};

export default createMobiles;

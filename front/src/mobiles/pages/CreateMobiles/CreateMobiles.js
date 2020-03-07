import React, { useState } from "react";

import Input from "../../../shared/forms/Input/Input";
import Button from "../../../shared/UI/Button/Button";
import { useDispatch } from "react-redux";
import { useForm } from "../../../shared/forms/UseForm/UseForm";
import "./CreateMobiles.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_ISNUMBER,
  VALIDATOR_MAXLENGTH
} from "../../../shared/forms/validators/Validators";
import * as ActionCreators from "../../../store/Actions/mobiles";
import ErrorModal from "../../../shared/UI/ErrorModal/ErrorModal";

const createMobiles = props => {
  const [formState, inputHandler] = useForm(
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

  const fileChangeHandler = event => {
    const targetedFile = event.target.files[0];
    setFile(targetedFile);
    setImageSelected(URL.createObjectURL(targetedFile));
  };

  const onSubmitForm = event => {
    event.preventDefault();
    dispatch(
      ActionCreators.createMobile(
        formState.inputs.title.value,
        formState.inputs.description.value,
        +formState.inputs.price.value,
        formState.inputs.model.value,
        file
      )
    )
      .then(() => {
        props.history.push("/");
        setmobError("");
      })
      .catch(err => {
        setmobError(err);
      });
  };

  return (
    <>
      <div className="formParent">
        <h1>
          {!props.match.params.id
            ? "Create A New Mobile Item"
            : "Edit Your Mobile"}
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

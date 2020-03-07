import React, { useState, useEffect, useCallback } from "react";

import Input from "../../../shared/forms/Input/Input";
import Button from "../../../shared/UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../shared/forms/UseForm/UseForm";
import "./UpdateMobiles.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_ISNUMBER,
  VALIDATOR_MAXLENGTH
} from "../../../shared/forms/validators/Validators";
import * as ActionCreators from "../../../store/Actions/mobiles";
import ErrorModal from "../../../shared/UI/ErrorModal/ErrorModal";
import Spinner from "../../../shared/UI/Spinner/Spinner";

const updateMobiles = props => {
  const targetedMobile = useSelector(state =>
    state.mobiles.mobiles.find(p => p._id === props.match.params.id)
  );

  const userId = useSelector(state => state.auth.userId);

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
  const [loading, setLoading] = useState(false);
  // const [targetedMobile, setTargetedMobile] = useState();

  const fileChangeHandler = event => {
    const targetedFile = event.target.files[0];
    setFile(targetedFile);
    setImageSelected(URL.createObjectURL(targetedFile));
  };

  const onFetchMobiles = useCallback(() => {
    setLoading(true);
    dispatch(ActionCreators.fetchMobiles())
      .then(() => {
        setLoading(false);
      })
      .catch(err => setmobError(err));
  }, [dispatch]);

  useEffect(() => {
    if (!targetedMobile) {
      onFetchMobiles();
    }
  }, [dispatch, onFetchMobiles]);

  const onSubmitForm = event => {
    event.preventDefault();
    const theFile = file ? file: targetedMobile.imageUrl;
    console.log('ff',theFile);
    dispatch(
      ActionCreators.editMobile(
        props.match.params.id,
        formState.inputs.title.value,
        formState.inputs.description.value,
        +formState.inputs.price.value,
        formState.inputs.model.value,
        theFile
      )
    )
      .then(() => {
        props.history.push("/");
        setmobError("");
      })
      .catch(err => {
        console.log(err.response);
        setmobError(err);
      });
  };

  return (
    <>
      <div className="formParent">
        <h1>{"Edit Your Mobile"}</h1>
        <form
          className="login-form"
          onSubmit={onSubmitForm}
          encType="multipart/form-data"
        >
          <div className="form-control">
            {!loading &&
            targetedMobile &&
            targetedMobile.userId._id === userId ? (
              <>
                <div className="inputParent">
                  <Input
                    element="input"
                    id="title"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    initialValue={targetedMobile.title}
                    initialValid={true}
                  />
                </div>
                <div className="inputParent">
                  <Input
                    element="textarea"
                    id="description"
                    label="Description"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(150)]}
                    onInput={inputHandler}
                    initialValue={targetedMobile.description}
                    initialValid={true}
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
                    initialValue={targetedMobile.price}
                    initialValid={true}
                  />
                </div>
                <div className="inputParent">
                  <Input
                    element="select"
                    id="model"
                    label="Mobile Model"
                    validators={[]}
                    onInput={inputHandler}
                    initialValue={targetedMobile.model}
                    initialValid={true}
                  />
                </div>
                <div className="inputParent">
                  <label htmlFor="mobile_Picture">
                    Select Your Mobile Photo
                  </label>
                  <input
                    id="mobile_Picture"
                    type="file"
                    label="Select Mobile Photo"
                    onChange={fileChangeHandler}
                    accept=".png, .jpg, .jpeg"
                    name="pic"
                  />
                </div>
                <div className="submit-button">
                  <Button
                    type="submit"
                    disabled={
                      !formState.inputs.title.isValid ||
                      !formState.inputs.description.isValid ||
                      !formState.inputs.price.isValid ||
                      (!file && !targetedMobile.imageUrl)
                    }
                  >
                    {"Edit Your Mobile"}
                  </Button>
                </div>
              </>
            ) : (!loading &&
                targetedMobile &&
                targetedMobile.userId._id !== userId) ||
              (!targetedMobile && !loading) ? (
              <ErrorModal
                open={true}
                onClose={() => props.history.push("/")}
                errorMessage="Failed To load this mobile"
                firstButton={true}
                firstButtonMethod={() => props.history.push("/")}
                firstButtonTitle="Return"
                secondButton={false}
              />
            ) : (
              <Spinner />
            )}
          </div>
          {targetedMobile || imageSelected ? (
            <div className="image-selected">
              <img src={imageSelected || targetedMobile.imageUrl} alt="mobileImage" />
            </div>
          ) : null}
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

export default updateMobiles;

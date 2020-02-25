import React, { useReducer, useEffect } from "react";

import { validate } from "../../shared/validators/Validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators).isValid
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true
      };
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH"
    });
  };

  let element;
  switch (props.element) {
    case "input":
      element = (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
      break;
    case "textarea":
      element = (
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
      break;
    case "select":
      element = (
        <select
          id={props.id}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        >
          <option value="samsung">Samsung</option>
          <option value="iphone">Iphone</option>
          <option value="oppo">Oppo</option>
          <option value="vivo">Vivo</option>
          <option value="nokia">Nokia</option>
          <option value="lenovo">Lenovo</option>
          <option value="sony">Sony</option>
        </select>
      );
      break;
    default:
      element = (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          {...props}
        />
      );
  }

  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        "form-control--invalid"}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <>
          {validate(inputState.value, props.validators).errorMessages.map(
            txtObj => {
              if (txtObj.appear) {
                return <p key={txtObj.text}>{txtObj.text}</p>;
              }
            }
          )}
        </>
      )}
    </div>
  );
};

export default Input;

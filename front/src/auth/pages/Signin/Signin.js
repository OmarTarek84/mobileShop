import React, {useState} from "react";
import Button from "../../../shared/UI/Button/Button";
import axios from "axios";
import Input from "../../../shared/forms/Input/Input";
import { useDispatch } from "react-redux";
import * as ActionCreators from "../../../store/Actions/auth";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL
} from "../../../shared/forms/validators/Validators";
import { useForm } from "../../../shared/forms/UseForm/UseForm";
import ErrorModal from '../../../shared/UI/ErrorModal/ErrorModal';

const signin = props => {
  const dispatch = useDispatch();
  const [signinerr, setsigninerr] = useState('');

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const onSubmitForm = event => {
    event.preventDefault();
    let requestBody;
    const email = formState.inputs.email.value;
    const password = formState.inputs.password.value;

    requestBody = {
      query: `
                query LoginUser($email: String!, $password: String!) {
                    loginUser(email: $email, password: $password) {
                        token
                        tokenExpiration
                        userId
                        firstname
                      }
                }
            `,
      variables: {
        email: email,
        password: password
      }
    };

    axios
      .post("http://localhost:8080/graphql", JSON.stringify(requestBody), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resData => {
        const token = resData.data.data.loginUser.token;
        const userId = resData.data.data.loginUser.userId;
        const firstname = resData.data.data.loginUser.firstname;
        console.log(localStorage.getItem("expDate"));
        dispatch(
          ActionCreators.login(
            token,
            userId,
            firstname,
            localStorage.getItem("expDate")
          )
        );
        props.history.push("/");
      })
      .catch(err => {
        setsigninerr(err);
      });
  };

  // successGoogle = res => {
  //     this.props.onAuthGoogle(res);
  // }
  return (
    <div className="formParent">
      <h1>SIGN IN Form</h1>
      <form className="login-form" onSubmit={onSubmitForm}>
        <Input
          element="input"
          type="email"
          placeholder="Your Email"
          id="email"
          onInput={inputHandler}
          label="E-mail"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        />
        <Input
          element="input"
          type="password"
          placeholder="Password"
          id="password"
          label="Your Password"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
        />
        <div className="submit-button">
          <Button type="submit" disabled={!formState.isValid}>
            SIGN IN!
          </Button>
        </div>
      </form>
      <ErrorModal
        open={!!signinerr}
        onClose={() => setsigninerr("")}
        errorMessage={
          signinerr.response &&
          signinerr.response.data &&
          signinerr.response.data.errors[0]
            ? signinerr.response.data.errors[0].message
            : "Unknown Error, We'll fix it soon"
        }
      />
    </div>
  );
};
export default signin;

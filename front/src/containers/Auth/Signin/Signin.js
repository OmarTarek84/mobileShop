import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "axios";
import Input from "../../../shared/Input/Input";
import { useDispatch } from "react-redux";
import * as ActionCreators from "../../../store/Actions/auth";
import { useForm } from "../../../components/Inputs/CreateMobileInput";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL
} from "../../../shared/validators/Validators";
// import GoogleLogin from 'react-google-login';

const signin = props => {

    const dispatch = useDispatch();

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
        dispatch(ActionCreators.login(token, userId, firstname));
        props.history.push("/");
      })
      .catch(err => {});
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
          validators={[
            VALIDATOR_REQUIRE(),
          ]}
        />
        <div className="submit-button">
          <Button type="submit" disabled={!formState.isValid}>
            SIGN IN!
          </Button>
        </div>
        {/* <div>
                        <GoogleLogin
                         clientId=''
                         buttonText="Google"
                         onSuccess={this.successGoogle}
                         onFailure={this.successGoogle} />
                    </div> */}
      </form>
    </div>
  );
};
// const mapDispatchToProps = dispatch => {
//     return {
//         onLogIn: (token, userId, firstname) => dispatch(ActionCreators.login(token, userId, firstname)),
//         checkAuthState: () => dispatch(ActionCreators.checkAuthState()),
//         onAuthGoogle: (data) => dispatch(ActionCreators.googleAuth(data))
//     }
// }

export default signin;

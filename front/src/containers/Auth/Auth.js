import React, { Component } from "react";
import "./Auth.css";
import Button from "../../components/UI/Button/Button";
import axios from "axios";
import Input from "../../shared/Input/Input";
// import GoogleLogin from 'react-google-login';
import * as ActionCreators from "../../store/Actions/auth";
import { useForm } from "../../components/Inputs/CreateMobileInput";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MATCHPASSWORDS,
  VALIDATOR_MINLENGTH
} from "../../shared/validators/Validators";

const auth = props => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      firstname: {
        value: "",
        isValid: false
      },
      lastname: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      },
      confirmPassword: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const onSubmitForm = event => {
    event.preventDefault();
    console.log(formState);
    let requestBody;
    const email = formState.inputs.email.value;
    const password = formState.inputs.password.value;
    const firstname = formState.inputs.firstname.value;
    const lastname = formState.inputs.lastname.value;
    const confirmPassword = formState.inputs.confirmPassword.value;

    requestBody = {
      query: `
                mutation CreateUser($email: String!, $password: String!, $confirmPassword: String!, $firstname: String!, $lastname: String!) {
                    createUser(userInput: {
                        email: $email,
                        password: $password,
                        confirmPassword: $confirmPassword,
                        firstname: $firstname,
                        lastname: $lastname
                    }) {
                        _id
                        email
                        firstname
                        lastname
                    }
                }
            `,
      variables: {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        firstname: firstname,
        lastname: lastname
      }
    };

    axios
      .post("http://localhost:8080/graphql", JSON.stringify(requestBody), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resData => {
        props.history.push("/signin");
      })
      .catch(err => {});
  };

  // successGoogle = res => {
  //     this.props.onAuthGoogle(res)
  // }

  return (
    <div className="formParent">
      <h1>SIGN UP Form</h1>
      <form className="login-form" onSubmit={onSubmitForm}>
        <>
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
            type="text"
            placeholder="Your First Name"
            id="firstname"
            onInput={inputHandler}
            label="First Name"
            validators={[VALIDATOR_REQUIRE()]}
          />
          <Input
            element="input"
            type="text"
            placeholder="Your Last Name"
            id="lastname"
            onInput={inputHandler}
            label="Last Name"
            validators={[VALIDATOR_REQUIRE()]}
          />
          <Input
            element="input"
            type="password"
            placeholder="Your password"
            id="password"
            label="Password"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
          />
          <Input
            element="input"
            type="password"
            placeholder="confirm Your Password"
            id="confirmPassword"
            label="Confirm Password"
            onInput={inputHandler}
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MATCHPASSWORDS(formState.inputs.password.value)
            ]}
          />
        </>
        <div className="submit-button">
          <Button type="submit" disabled={!formState.isValid}>
            SIGN UP!
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
//         onAuthGoogle: (data) => dispatch(ActionCreators.googleAuth(data))
//     };
// };

export default auth;

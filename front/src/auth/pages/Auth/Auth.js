import React, { useState } from "react";
import "./Auth.css";
import Button from "../../../shared/UI/Button/Button";
import axios from "axios";
import Input from "../../../shared/forms/Input/Input";
import { useForm } from "../../../shared/forms/UseForm/UseForm";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MATCHPASSWORDS,
  VALIDATOR_MINLENGTH
} from "../../../shared/forms/validators/Validators";
import ErrorModal from "../../../shared/UI/ErrorModal/ErrorModal";

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

  const [authErr, setAutherr] = useState('');

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
      .post("/graphql", JSON.stringify(requestBody), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resData => {
        props.history.push("/signin");
      })
      .catch(err => {
        setAutherr(err);
      });
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
      </form>
      <ErrorModal
        open={!!authErr}
        onClose={() => setAutherr("")}
        errorMessage={
          authErr.response &&
          authErr.response.data &&
          authErr.response.data.errors[0]
            ? authErr.response.data.errors[0].message
            : "Unknown Error, We'll fix it soon"
        }
      />
    </div>
  );
};

export default auth;

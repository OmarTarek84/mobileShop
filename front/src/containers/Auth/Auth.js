import React, { Component } from 'react';
import './Auth.css';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';
import Input from '../../components/Input/Input';
// import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux';
import * as ActionCreators from '../../store/Actions/auth';

class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    name: 'email',
                    type: 'email'
                },
                validationRules: {
                    required: true,
                    isEmail: true
                },
                value: '',
                valid: false,
                touched: false,
                errorMessage: '',
                show: true,
            },
            firstname: {
                elementType: 'input',
                elementConfig: {
                    name: 'firstname',
                    type: 'text'
                },
                validationRules: {
                    required: true,
                },
                value: '',
                valid: false,
                touched: false,
                errorMessage: '',
                show: true,
            },
            lastname: {
                elementType: 'input',
                elementConfig: {
                    name: 'lastname',
                    type: 'text'
                },
                validationRules: {
                    required: true,
                },
                value: '',
                valid: false,
                touched: false,
                errorMessage: '',
                show: true,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    name: 'password',
                    type: 'password'
                },
                validationRules: {
                    required: true,
                    minLength: true
                },
                value: '',
                valid: false,
                touched: false,
                errorMessage: '',
                show: true,
            },
            confirmpassword: {
                elementType: 'input',
                elementConfig: {
                    name: 'confirmpassword',
                    type: 'password'
                },
                validationRules: {
                    required: true,
                    withPassword: true
                },
                value: '',
                valid: false,
                touched: false,
                errorMessage: '',
                show: true,
            }
        },
        formIsValid: false
    }

    changeInputHandler = (event, inputIdentifier) => {
        const authForm = {...this.state.authForm};
        const stateElement = {...authForm[inputIdentifier]};
        stateElement.value = event.target.value;
        stateElement.touched = true;
        stateElement.valid = this.checkValidity(stateElement.value, stateElement.validationRules);
        authForm[inputIdentifier] = stateElement;

        let formValid = true;
        for (let key in authForm) {
            formValid = authForm[key].valid && formValid
        }
        this.setState({authForm: authForm, formIsValid: formValid});
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isEmail) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(value) && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= 6 && isValid;
        }

        if (rules.withPassword) {
            isValid = value === this.state.authForm.password.value && isValid
        }

        return isValid;
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        let requestBody;
        const email = this.state.authForm.email.value;
        const password = this.state.authForm.password.value;
        const firstname = this.state.authForm.firstname.value;
        const lastname = this.state.authForm.lastname.value;
        const confirmPassword = this.state.authForm.confirmpassword.value;

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

        axios.post('/graphql', JSON.stringify(requestBody), {headers: {
            'Content-Type': 'application/json'
        }}).then(resData => {
                this.props.history.push('/signin');
            })
            .catch(err => {
            });
    };

    // successGoogle = res => {
    //     this.props.onAuthGoogle(res)
    // }

    render() {
        let formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        return (
            <div className="formParent">
                <h1>SIGN UP Form</h1>
                <form className="login-form" onSubmit={this.onSubmitForm}>
                    {formElementsArray.map(formElement => {
                        return (
                                <Input key={formElement.id}
                                       elementType={formElement.config.elementType}
                                       elementConfig={formElement.config.elementConfig}
                                       value={formElement.config.value}
                                       label={formElement.id.toUpperCase()}
                                       changed={(event) => this.changeInputHandler(event, formElement.id)}
                                       invalid={!formElement.config.valid}
                                       touched={formElement.config.touched}
                                       error={formElement.config.errorMessage}
                                       showinput={!formElement.config.show} />
                        )
                    })}
                    <div className="submit-button">
                        <Button type="submit"
                                disabled={!this.state.formIsValid}>SIGN UP!</Button>
                  
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
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthGoogle: (data) => dispatch(ActionCreators.googleAuth(data))
    };
};

export default connect(null, mapDispatchToProps)(Auth);
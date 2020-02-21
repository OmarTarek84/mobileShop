import React, { Component } from 'react';

import Input from '../../components/Input/Input';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';
import {connect} from 'react-redux';
import queryString from 'querystring';

class CreateMobiles extends Component {

    state = {
        createMobileForm: {
            Title: {
                elementType: 'input',
                elementConfig: {
                    name: 'title',
                    type: 'text'
                },
                validationRules: {
                    required: true
                },
                value: '',
                valid: false,
                touched: false,
            },
            Description: {
                elementType: 'textarea',
                elementConfig: {
                    name: 'description',
                    type: 'text'
                },
                validationRules: {
                    required: true,
                    maxLength: true
                },
                value: '',
                valid: false,
                touched: false,
            },
            Price: {
                elementType: 'input',
                elementConfig: {
                    name: 'price',
                    type: 'number'
                },
                validationRules: {
                    required: true,
                },
                value: '',
                valid: false,
                touched: false
            },
            Model: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'samsung', displayValue: 'Samsung'},
                        {value: 'iphone', displayValue: 'Iphone'},
                        {value: 'oppo', displayValue: 'Oppo'},
                        {value: 'vivo', displayValue: 'Vivo'},
                        {value: 'nokia', displayValue: 'Nokia'},
                        {value: 'lenovo', displayValue: 'Lenovo'},
                        {value: 'sony', displayValue: 'Sony'},
                    ]
                },
                validationRules: {
                    required: true,
                    minLength: true
                },
                value: 'samsung',
                valid: true,
                touched: false
            },
            mobile_Picture: {
                elementType: 'input',
                elementConfig: {
                    type: 'file',
                    name: 'pic',
                    accept: '.png, .jpg, .jpeg'
                },
                validationRules: {
                    required: true,
                },
                value: '',
                imageValue: '',
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        mode: 'create',
        filteredMobile: null,
        file: null,
        imageSelected: null
    }

    changeInputHandler = (event, inputIdentifier) => {
        const createMobileForm = {...this.state.createMobileForm};
        const stateElement = {...createMobileForm[inputIdentifier]};
        stateElement.value = event.target.value;
        if (inputIdentifier === 'mobile_Picture' && event.target.files[0]) {
            const file = event.target.files[0];
            this.setState({file: file, imageSelected: URL.createObjectURL(file)});
        }
        stateElement.touched = true;
        stateElement.valid = this.checkValidity(stateElement.value, stateElement.validationRules);
        createMobileForm[inputIdentifier] = stateElement;

        let formValid = true;
        for (let key in createMobileForm) {
            formValid = createMobileForm[key].valid && formValid
        }
        this.setState({createMobileForm: createMobileForm, formIsValid: formValid});
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        for (let key in params) {
            if (params[key]) {
                const editedMobile = this.props.location.state.filteredMobile;
                const editForm = {...this.state.createMobileForm};
                const title = {...editForm['Title']};
                const description = {...editForm['Description']};
                const price = {...editForm['Price']};
                const model = {...editForm['Model']};
                title.value = editedMobile.title;
                title.valid = true;
                description.value = editedMobile.description;
                description.valid = true;
                price.value = editedMobile.price;
                price.valid = true;
                model.value = editedMobile.model;
                model.valid = true;
                editForm['Title'] = title;
                editForm['Description'] = description;
                editForm['Price'] = price;
                editForm['Model'] = model;
                this.setState({createMobileForm: editForm, mode: 'edit', filteredMobile: editedMobile});

            } else {
                this.setState({mode: 'create'});
            }
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length < 150 && isValid;
        }

        return isValid;
    }


    onSubmitForm = (event) => {
        event.preventDefault();
        this.setState({formIsValid: false});
        const formData = new FormData();
        formData.append('pic', this.state.file);
        fetch('http://localhost:8080/post-image', {
            method: 'PUT',
            headers: {
              Authorization: 'Bearer ' + this.props.token
            },
            body: formData
          }).then(res => res.json())
          .then(fileResData => {
              const urlImg = fileResData.filePath;
              const title = this.state.createMobileForm.Title.value;
              const description = this.state.createMobileForm.Description.value;
              const price = +this.state.createMobileForm.Price.value;
              const model = this.state.createMobileForm.Model.value;
              let requestBody;
              if (this.state.mode === 'create') {
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
                  }
              }
      
              return axios.post('http://localhost:8080/graphql', JSON.stringify(requestBody), {headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + this.props.token
              }}).then(resData => {
                      this.props.history.push('/');
                  })
                  .catch(err => {
                      console.log(err);
                  });
          })
    }

    render() {
        let formElementsArray = [];
        for (let key in this.state.createMobileForm) {
            formElementsArray.push({
                id: key,
                config: this.state.createMobileForm[key]
            });
        }

        return (
            <div className="formParent">
                <h1>{this.state.mode === 'create' ? 'Create A New Mobile Item' : 'Edit Your Mobile'}</h1>
                <form className="login-form" onSubmit={this.onSubmitForm} encType="multipart/form-data">
                    {formElementsArray.map(formElement => {
                        return (
                                <Input key={formElement.id}
                                       elementType={formElement.config.elementType}
                                       elementConfig={formElement.config.elementConfig}
                                       value={formElement.config.value}
                                       label={formElement.id.toUpperCase()}
                                       changed={(event) => this.changeInputHandler(event, formElement.id)}
                                       invalid={!formElement.config.valid}
                                       touched={formElement.config.touched} />
                        )
                    })}
                    {this.state.imageSelected
                     ?
                     <div className="image-selected">
                        <img src={this.state.imageSelected} alt="mobileImage" />
                     </div>
                     :
                     null}
                    <div className="submit-button">
                        <Button type="submit"
                                disabled={!this.state.formIsValid}>
                            {this.state.mode === 'create' ? 'Create New Mobile' : 'Edit Mobile'}        
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId
    }
}

export default connect(mapStateToProps)(CreateMobiles);
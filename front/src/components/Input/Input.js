import React from 'react';
import './Input.css';

const input = props => {
    let inputType;
    let classes = ['inputtype'];
    let inputparentshow = ['form-control'];
    let errorMessages = <p></p>;
    if (props.showinput) {
        inputparentshow.push('displaynone');
    }
    if (props.touched) {
        if (props.invalid) {
            classes.push('invalid');
            if (props.elementConfig.name === 'email') {
                errorMessages = <p className="errormessage">Email is Invalid</p>
            }
            if (props.elementConfig.name === 'firstname') {
                errorMessages = <p className="errormessage">This field is required</p>
            }
            if (props.elementConfig.name === 'lastname') {
                errorMessages = <p className="errormessage">This field is required</p>
            }
            if (props.elementConfig.name === 'password') {
                errorMessages = <p className="errormessage">password should be at least 6 characters</p>
            }
            if (props.elementConfig.name === 'confirmpassword') {
                errorMessages = <p className="errormessage">must match password field</p>
            }
        } else {
            classes.push('valid');
        }
    }
    switch(props.elementType) {
        case 'input':
            inputType = <input
                            {...props.elementConfig} 
                            value={props.value} 
                            onChange={props.changed}
                            className={classes.join(' ')} />;
            break;
        case 'textarea':
            inputType = <textarea 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}></textarea>;
            break;
        case 'select':
            inputType = 
            <select value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => {
                    return (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    )
                })}
            </select>
            break;
        default:
            inputType = <input 
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}
                                className={classes.join(' ')} />;
    }
    return (
        <div className={inputparentshow.join(' ')}>
            <label>{props.label}</label>
            {inputType}
            {errorMessages}
        </div>
    )
};

export default input;
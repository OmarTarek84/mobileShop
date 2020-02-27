import React from 'react';
import './Button.css';

const button = props => {
    return (
        <button onClick={props.clicked} 
                type={props.type} 
                disabled={props.disabled} 
                className="buttonn">
            {props.children}
        </button>
    )
};

export default button;
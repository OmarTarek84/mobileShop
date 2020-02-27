import React from 'react';
import './Backdrop.css';

const backdrop = props => {
    if (props.show) {
        return (
            <div className="backdrop" onClick={props.close}>{props.children}</div>
        )
    } else {
        return null;
    }
};

export default backdrop;
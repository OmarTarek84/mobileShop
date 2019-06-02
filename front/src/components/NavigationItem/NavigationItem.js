import React from 'react';
import './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = props => {
    return (
        <li className="nav-li">
            <NavLink to={props.link} onClick={props.close} exact>{props.children}</NavLink>
        </li>
    )
};

export default navigationItem;
import React from 'react';
import './Layout.css';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const layout = props => {
    return (
        <div className="layout">
            <NavigationItems />
            <main className="main">
                {props.children}
            </main>
        </div>
    )
};

export default layout;
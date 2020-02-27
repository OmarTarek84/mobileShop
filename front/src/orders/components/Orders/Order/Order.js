import React from 'react';
import './Order.css';

const order = props => {
    return (
        <div className="order" key={props.id}>
            <h3>Order: #<span>{props.id}</span></h3>
            {props.orderMobiles.map(order => {
                return (
                    <div className="order-detail" key={order.mobile._id}>
                        <p>{order.mobile.title} (<span>{order.quantity}</span>)</p>
                    </div>
                )
            })}
            <div>Date of Order: <span>{props.date}</span></div>
        </div>
    )
};

export default order;
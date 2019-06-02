import React from 'react';
import Order from './Order/Order';

const orders = props => {
    return props.orders.map(order => {
        return (
            <Order id={order._id} 
                   key={order._id}
                   orderMobiles={order.order}
                   date={order.createdAt} />
        )
    });
};

export default orders;
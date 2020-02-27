import React from 'react';
import './Cart.css';
import Trash from '../../../../images/trash.jpg';

const cart = props => {
    return (
        <tr key={props.id}>
            <td>
                <div>
                    <img src={props.imageUrl} alt="my phoneimage" />
                </div>
            </td>
            <td>{props.title}</td>
            <td className="table-cart-price">${props.price}</td>
            <td><span onClick={props.onCartDecrement}>-</span> {props.quantity} <span onClick={props.onCartIncrement}>+</span></td>
            <td>
                <div className="trash-image" onClick={props.removeCart}>
                    <img src={Trash} alt="trashImage" />
                </div>
            </td>
            <td>${props.totalPrice}</td>
        </tr>
    )
};

export default cart;
import React from 'react';
import Cart from './Cart/Cart';
import './Carts.css';
import Button from '../UI/Button/Button';

const carts = props => {
    const cartList = props.carts.map(cart => {
        return <Cart key={cart._id} 
                     id={cart._id}
                     price={cart.mobileId.price}
                     imageUrl={cart.mobileId.imageUrl}
                     quantity={cart.quantity}
                     title={cart.mobileId.title}
                     totalPrice={cart.quantity * cart.mobileId.price}
                     onCartIncrement={props.onIncrementCart.bind(this, cart._id)}
                     onCartDecrement={props.onDecrementCart.bind(this, cart._id)}
                     removeCart={props.onRemoveCart.bind(this, cart._id)} />
    });
    return (
        <>
        <div style={{overflowX: 'auto'}}>
            <table className="cart-parent" border="1">
                <thead>
                    <tr>
                        <th>Products</th>
                        <th>Name Of Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Remove</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartList}
                </tbody>
            </table>
        </div>
        <div className="clear_and_order">
            <button className="clear_cart" onClick={props.clearCart}>Clear Cart</button>
            <div className="order_total">
                <p>Subtotal: <span>${props.subTotalPrice}</span></p>
                <p>Tax: <span>${(props.subTotalPrice * 0.1).toFixed(2)}</span></p>
                <p>Total: <span>${(props.subTotalPrice + (props.subTotalPrice * 0.1)).toFixed(2)}</span></p>
            </div>
            <div className="order_stripe">
                <Button clicked={props.onOrder} disabled={props.onDisabled}>Order Now!</Button>
            </div>
        </div>
        </>
    )
};

export default carts;
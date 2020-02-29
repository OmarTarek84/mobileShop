import React from "react";
import Cart from "./Cart/Cart";
import "./Carts.css";
import Button from "../../../shared/UI/Button/Button";

const carts = props => {
  let cartList;
  if (props.cartExist && props.pageLoaded) {
    cartList = props.carts.map(cart => {
      return (
        <Cart
          key={cart._id}
          id={cart._id}
          price={cart.mobileId.price}
          imageUrl={cart.mobileId.imageUrl}
          quantity={cart.quantity}
          title={cart.mobileId.title}
          totalPrice={(cart.quantity * cart.mobileId.price).toFixed(2)}
          onCartIncrement={props.onIncrementCart.bind(this, cart._id)}
          onCartDecrement={props.onDecrementCart.bind(this, cart._id)}
          removeCart={props.onRemoveCart.bind(this, cart._id)}
        />
      );
    });
  } else if (!props.cartExist && props.pageLoaded) {
    return <h1>No Carts Here!!!</h1>;
  } else if (props.cartError) {
    return <h1>Error in fetching carts</h1>;
  }
  return (
    <>
      {props.pageLoaded ? (
        <>
          <div style={{ overflowX: "auto" }}>
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
              <tbody>{cartList}</tbody>
            </table>
          </div>
          <div className="clear_and_order">
            <button className="clear_cart" onClick={props.clearCart}>
              Clear Cart
            </button>
            <div className="order_total">
              <p>
                Subtotal: <span>${props.subTotalPrice.toFixed(2)}</span>
              </p>
              <p>
                Tax: <span>${(props.subTotalPrice * 0.1).toFixed(2)}</span>
              </p>
              <p>
                Total:{" "}
                <span>
                  $
                  {(props.subTotalPrice + props.subTotalPrice * 0.1).toFixed(2)}
                </span>
              </p>
            </div>
            <div className="order_stripe">
              <Button clicked={props.onOrder} disabled={props.onDisabled}>
                Order Now!
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default carts;

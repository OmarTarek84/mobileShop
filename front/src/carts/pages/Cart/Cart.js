import React, { useState, useEffect } from "react";
import Carts from "../../components/Carts/Carts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../../../shared/UI/Spinner/Spinner";
import * as ActionCreators from '../../../store/Actions/cart';

const cart = props => {
  const [carts, setCarts] = useState([]);
  const [noItemsInCart, setnoItemsInCart] = useState(false);
  const [quantity, setquantity] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [onDisabled, setonDisabled] = useState(false);
  const [showPayment, setshowPayment] = useState(false);

  const token = useSelector(state => state.auth.token);
  const cartsData = useSelector(state => state.carts.carts);
  const dispatch = useDispatch();

  useEffect(() => {
    onFetchCarts();
  }, [dispatch, onFetchCarts]);

  const fetchCartSuccess = resData => {
    let price = 0;
    let cartTarget = [];
    if (resData.data.data.cart) {
        cartTarget = resData.data.data.cart;
    } else {
        cartTarget = resData.data.data.removeCart;
    }
    console.log(cartTarget);
    cartTarget.map(car => {
      price += +car.mobileId.price * car.quantity;
      settotalPrice(price);
    });
    if (cartTarget.length <= 0) {
      setnoItemsInCart(true);
    } else {
      setCarts(cartTarget);
      setnoItemsInCart(false);
    }
    setisLoading(false);
  };

  const onFetchCarts = () => {
    setisLoading(true);
    dispatch(ActionCreators.fetchCarts())
    .then(() => {
      let price = 0;
      cartsData.map(car => {
        price += +car.mobileId.price * car.quantity;
        settotalPrice(price);
      });
      if (cartsData.length <= 0) {
        setnoItemsInCart(true);
      } else {
        setCarts(cartsData);
        setnoItemsInCart(false);
      }
      setisLoading(false);
    })
    .catch((err) => {
      setisLoading(false);
      setnoItemsInCart(true);
    })
  };

  const onCartIncrement = id => {
    // setisLoading(true);
    let originalCartQuantity;
    let existingCarts = [...carts];
    const filteredCartIndex = existingCarts.findIndex(p => {
      return p._id === id;
    });
    originalCartQuantity = existingCarts[filteredCartIndex].quantity;
    existingCarts[filteredCartIndex].quantity += 1;
    let price = 0;
    existingCarts.forEach(car => {
      price += +car.mobileId.price * car.quantity;
      settotalPrice(price);
    });
    setisLoading(false);
    setCarts(existingCarts);
    settotalPrice(price);
    console.log(existingCarts[filteredCartIndex].quantity);
    const requestBody = {
      query: `
                mutation IncrementItemToCart($cartId: String!, $cartQuantity: Int!) {
                    incrementItemToCart(cartId: $cartId, cartQuantity: $cartQuantity) {
                        quantity
                        userId {
                          email
                        }
                        mobileId {
                          title
                          description
                          price
                        }
                      }
                }
            `,
      variables: {
        cartId: id,
        cartQuantity: originalCartQuantity
      }
    };

    axios
      .post("http://localhost:8080/graphql", JSON.stringify(requestBody), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(resData => {

      })
      .catch(err => {
        setisLoading(false);
      });
  };

  const onCartDecrement = id => {
    // setisLoading(true);
    let originalCartQuantityD; 
    let existingCarts = [...carts];
    const filteredCartIndex = existingCarts.findIndex(p => {
      return p._id === id;
    });
    originalCartQuantityD = existingCarts[filteredCartIndex].quantity;
    existingCarts[filteredCartIndex].quantity -= 1;
    if (existingCarts[filteredCartIndex].quantity == 0) {
      if (carts.length == 1 && carts[0].quantity == 0) {
        setCarts([]);
        settotalPrice(0);
        setnoItemsInCart(true);
      } else {
        const cartsAfterFilter = carts.filter(p => p._id != id);
        setCarts(cartsAfterFilter);
        settotalPrice(totalPrice - existingCarts[filteredCartIndex].mobileId.price);
      }
      console.log(carts);
    } else {
      let price = 0;
      existingCarts.forEach(car => {
        price += +car.mobileId.price * car.quantity;
        settotalPrice(price);
      });
      setisLoading(false);
      setCarts(existingCarts);
      settotalPrice(price);
    }
    const requestBody = {
      query: `
                mutation DecrementItemToCart($cartId: String!, $cartQuantity: Int!) {
                    decrementItemToCart(cartId: $cartId, cartQuantity: $cartQuantity) {
                        quantity
                        userId {
                          email
                        }
                        mobileId {
                          title
                          description
                          price
                        }
                      }
                }
            `,
      variables: {
        cartId: id,
        cartQuantity: originalCartQuantityD
      }
    };

    axios
      .post("http://localhost:8080/graphql", JSON.stringify(requestBody), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(resData => {

      })
      .catch(err => {
        setisLoading(false);
      });
  };

  const onClearCart = () => {
    setisLoading(true);
    const requestBody = {
      query: `
                mutation {
                    clearCart {
                    email
                    }
                }  
            `
    };
    axios
      .post("http://localhost:8080/graphql", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(resData => {
        settotalPrice(0);
        setnoItemsInCart(true);
        setisLoading(false);
      });
  };

  const removeCart = id => {
    let cartsAfterFilter = carts.filter(p => p._id != id);
    setCarts(cartsAfterFilter);
    let price = 0;
    if (cartsAfterFilter.length > 0) {
      cartsAfterFilter.forEach(car => {
        price += +car.mobileId.price * car.quantity;
        settotalPrice(price);
      });
    } else {
      setCarts([]);
      settotalPrice(0);
      setnoItemsInCart(true);
    }
    const requestBody = {
      query: `
                mutation RemoveCart($cartId: String!) {
                    removeCart(cartId: $cartId) {
                        _id
                        mobileId {
                            _id
                            title
                            imageUrl
                            price
                        }
                        userId {
                            _id
                            email
                            firstname
                            lastname
                        }
                        quantity
                      }
                }
            `,
      variables: {
        cartId: id
      }
    };
    axios
      .post("http://localhost:8080/graphql", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(resData => {
        // fetchCartSuccess(resData);
        console.log(resData);
        // onFetchCarts();
        // settotalPrice(0);
        // setisLoading(false);
      })
      .catch(err => {
        setisLoading(false);
      });
  };

  const onOrder = () => {
    setonDisabled(true);
    const requestBody = {
      query: `
            mutation {
                createOrder {
                  order {
                    mobile {
                      price
                    }
                    quantity
                  }
                  userId {
                    email
                  }
                }
              }
            `
    };

    axios
      .post("http://localhost:8080/graphql", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(resData => {
        console.log(resData);
        props.history.push("/orders");
      })
      .catch(err => {});
  };

  const backdropClose = () => {
    setshowPayment(false);
  };

  return (
    <div>
      {isLoading ? (
        <div className="spinner-parent">
          <Spinner />
        </div>
      ) : noItemsInCart ? (
        <h1 style={{ textAlign: "center", paddingTop: "40px" }}>
          No Items In Your Cart
        </h1>
      ) : (
        <>
          <h1
            style={{
              textAlign: "center",
              paddingTop: "30px",
              paddingBottom: "30px"
            }}
          >
            Your <span style={{ color: "#07393C" }}>Cart</span>
          </h1>
          <Carts
            carts={cartsData}
            onIncrementCart={onCartIncrement}
            onDecrementCart={onCartDecrement}
            subTotalPrice={totalPrice}
            clearCart={onClearCart}
            onRemoveCart={removeCart}
            onOrder={onOrder}
          />
        </>
      )}
    </div>
  );
};

export default cart;

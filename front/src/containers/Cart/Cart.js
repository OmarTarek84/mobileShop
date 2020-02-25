import React, { useState, useEffect } from "react";
import Carts from "../../components/Carts/Carts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";

const cart = props => {
  const [carts, setCarts] = useState([]);
  const [noItemsInCart, setnoItemsInCart] = useState(false);
  const [quantity, setquantity] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [onDisabled, setonDisabled] = useState(false);
  const [showPayment, setshowPayment] = useState(false);

  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const firstname = useSelector(state => state.auth.firstname);

  useEffect(() => {
    onFetchCarts();
  }, [onFetchCarts]);

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

    const requestBody = {
      query: `
                query Cart($userId: String) {
                    cart(userId: $userId) {
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
        userId: localStorage.getItem("userId")
      }
    };
    axios
      .post("http://localhost:8080/graphql", JSON.stringify(requestBody), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token
        }
      })
      .then(resData => {
        fetchCartSuccess(resData);
      })
      .catch(err => {
        console.log(err);
        setisLoading(false);
        setnoItemsInCart(true);
        setTimeout(() => {
          props.history.push("/authenticate");
        }, 4000);
      });
  };

  const onCartIncrement = id => {
    setisLoading(true);
    const requestBody = {
      query: `
                mutation IncrementItemToCart($cartId: String!) {
                    incrementItemToCart(cartId: $cartId) {
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
        cartId: id
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
        let existingCart = [...carts];
        const filteredCartIndex = existingCart.findIndex(p => {
          return p._id === id;
        });
        existingCart[filteredCartIndex].quantity += 1;
        const newPrice =
          totalPrice + resData.data.data.incrementItemToCart.mobileId.price;
        setisLoading(false);
        setCarts(existingCart);
        settotalPrice(newPrice);
      })
      .catch(err => {
        setisLoading(false);
      });
  };

  const onCartDecrement = id => {
    setisLoading(true);
    const requestBody = {
      query: `
                mutation DecrementItemToCart($cartId: String!) {
                    decrementItemToCart(cartId: $cartId) {
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
        cartId: id
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
        let existingCart = [...carts];
        const filteredCartIndex = existingCart.findIndex(p => {
          return p._id === id;
        });
        const filteredCart = existingCart.find(p => {
          return p._id === id;
        });
        let newPrice;
        if (existingCart[filteredCartIndex].quantity > 1) {
          existingCart[filteredCartIndex].quantity -= 1;
          newPrice =
            totalPrice - resData.data.data.decrementItemToCart.mobileId.price;
        } else {
          existingCart.splice(id, 1);
          newPrice = totalPrice - filteredCart.mobileId.price;
          if (existingCart.length <= 0) {
            setnoItemsInCart(true);
          }
        }
        setCarts(existingCart);
        settotalPrice(newPrice);
        setisLoading(false);
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
    setisLoading(true);
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
        fetchCartSuccess(resData);
        console.log(carts);
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
            carts={carts}
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

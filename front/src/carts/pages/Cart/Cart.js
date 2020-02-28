import React, { useState, useEffect, useCallback } from "react";
import Carts from "../../components/Carts/Carts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../../../shared/UI/Spinner/Spinner";
import * as ActionCreators from "../../../store/Actions/cart";
import ErrorModal from "../../../shared/UI/ErrorModal/ErrorModal";

const cart = props => {
  const [carts, setCarts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [cartErr, setCartErr] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const token = useSelector(state => state.auth.token);
  const cartsData = useSelector(state => state.carts.carts);
  const totalPricee = useSelector(state => state.carts.totalPrice);
  const dispatch = useDispatch();

  useEffect(() => {
    onFetchCarts();
    window.addEventListener("load", setPageLoaded(true));
  }, [dispatch, onFetchCarts]);

  // const fetchCartSuccess = resData => {
  //   let price = 0;
  //   let cartTarget = [];
  //   if (resData.data.data.cart) {
  //     cartTarget = resData.data.data.cart;
  //   } else {
  //     cartTarget = resData.data.data.removeCart;
  //   }
  //   console.log(cartTarget);
  //   cartTarget.map(car => {
  //     price += +car.mobileId.price * car.quantity;
  //     settotalPrice(price);
  //   });
  //   if (cartTarget.length <= 0) {
  //     setnoItemsInCart(true);
  //   } else {
  //     setCarts(cartTarget);
  //     setnoItemsInCart(false);
  //   }
  //   setisLoading(false);
  // };

  const onFetchCarts = useCallback(() => {
    setisLoading(true);
    dispatch(ActionCreators.fetchCarts())
      .then(() => {
        setisLoading(false);
        setCartErr(false);
      })
      .catch(err => {
        setisLoading(false);
        setCartErr(err);
      });
  }, [dispatch]);

  const onCartIncrement = id => {
    dispatch(ActionCreators.incrementCartItem(id));
  };

  const onCartDecrement = id => {
    dispatch(ActionCreators.decrementCartItem(id));
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
        // settotalPrice(0);
        // setnoItemsInCart(true);
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
        // settotalPrice(price);
      });
    } else {
      setCarts([]);
      // settotalPrice(0);
      // setnoItemsInCart(true);
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
    // setonDisabled(true);
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

  const ongotomobiles = () => {
    props.history.push("/");
  };

  return (
    <>
      <div>
        {isLoading ? (
          <div className="spinner-parent">
            <Spinner />
          </div>
        ) : (
          <>
            <h1
              style={{
                textAlign: "center",
                paddingTop: "30px",
                paddingBottom: "30px"
              }}
            >
              {pageLoaded ? (
                <div>
                  Your <span style={{ color: "#07393C" }}>Cart</span>
                </div>
              ) : null}
            </h1>
            <Carts
              carts={cartsData}
              onIncrementCart={onCartIncrement}
              onDecrementCart={onCartDecrement}
              subTotalPrice={totalPricee}
              clearCart={onClearCart}
              onRemoveCart={removeCart}
              onOrder={onOrder}
              cartExist={cartsData.length > 0}
              cartError={cartErr}
              pageLoaded={pageLoaded}
            />
          </>
        )}
      </div>
      <ErrorModal
        open={!!cartErr}
        onClose={() => setCartErr("")}
        errorMessage={
          cartErr.response &&
          cartErr.response.data &&
          cartErr.response.data.errors[0]
            ? cartErr.response.data.errors[0].message
            : "Unknown Error, We'll fix it soon"
        }
        firstButton={true}
        firstButtonMethod={() => onFetchCarts()}
        firstButtonTitle="Try Fetching Carts Again"
        secondButton={true}
        secondButtonMethod={ongotomobiles}
        secondButtonTitle="return to shopping!"
      />
    </>
  );
};

export default cart;

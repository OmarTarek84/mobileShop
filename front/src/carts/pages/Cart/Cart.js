import React, { useState, useEffect, useCallback } from "react";
import Carts from "../../components/Carts/Carts";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../shared/UI/Spinner/Spinner";
import * as OrderActionCreators from '../../../store/Actions/orders';
import * as ActionCreators from "../../../store/Actions/cart";
import ErrorModal from "../../../shared/UI/ErrorModal/ErrorModal";

const cart = props => {
  const [isLoading, setisLoading] = useState(false);
  const [cartErr, setCartErr] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const cartsData = useSelector(state => state.carts.carts);
  const totalPricee = useSelector(state => state.carts.totalPrice);
  const dispatch = useDispatch();

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

  useEffect(() => {
    onFetchCarts();
    window.addEventListener("load", setPageLoaded(true));
  }, [dispatch, onFetchCarts]);

  const onCartIncrement = id => {
    dispatch(ActionCreators.incrementCartItem(id))
    .then(() => {})
    .catch(err => {
      setCartErr(err);
    })
  };

  const onCartDecrement = id => {
    dispatch(ActionCreators.decrementCartItem(id))
    .then(() => {})
    .catch(err => setCartErr(err));
  };

  const onClearCart = () => {
    dispatch(ActionCreators.clearCart());
  };

  const removeCart = id => {
    dispatch(ActionCreators.removeCartItem(id));
  };

  const onOrder = () => {
    setisLoading(true);
    dispatch(OrderActionCreators.addOrder())
    .then(() => {
      setisLoading(false);
      props.history.push('/orders')
    })
    .catch(err => console.log(err))
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
              cartExist={cartsData.length > 0 && pageLoaded}
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
        firstButtonMethod={() => setCartErr("")}
        firstButtonTitle="Try Again"
        secondButton={false}
        // secondButtonMethod={ongotomobiles}
        // secondButtonTitle="return to shopping!"
      />
    </>
  );
};

export default cart;

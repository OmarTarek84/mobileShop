import React, { useEffect, useState, useCallback } from "react";
import {useDispatch} from 'react-redux';
import "./Orders.css";
import Orders from "../../components/Orders/Orders";
import { useSelector } from "react-redux";
import Spinner from "../../../shared/UI/Spinner/Spinner";
import * as ActionCreators from '../../../store/Actions/orders';
import ErrorModal from '../../../shared/UI/ErrorModal/ErrorModal';

const ordersContainer = props => {
  const [isLoading, setisLoading] = useState(false);
  const [orderError, setOrderError] = useState(false);

  const orderData = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  const onFetchOrders = useCallback(() => {
    setisLoading(true);
    dispatch(ActionCreators.fetchOrders())
    .then(() => {
      setOrderError(false);
      setisLoading(false);
    })
    .catch(err => {
      setOrderError(err);
      setisLoading(false);
    })
  });

  useEffect(() => {
    onFetchOrders();
  }, [onFetchOrders]);

  let allOrders;
  if (isLoading) {
    allOrders = <Spinner />;
  } else {
    if (orderData.length <= 0) {
      allOrders = <h1>No Orders Yet!!</h1>;
    } else {
      allOrders = <Orders orders={orderData} />;
    }
  }
  return (
    <>
    <div className="orders">
      <h1>
        Your <span>Orders</span>
      </h1>
      {allOrders}
    </div>
    <ErrorModal
        open={!!orderError}
        onClose={() => setOrderError("")}
        errorMessage={
          orderError.response &&
          orderError.response.data &&
          orderError.response.data.errors[0]
            ? orderError.response.data.errors[0].message
            : "Unknown Error, We'll fix it soon"
        }
        firstButton={true}
        firstButtonMethod={onFetchOrders}
        firstButtonTitle="Try Fetching Orders Again!!"
        secondButton={false}
        // secondButtonMethod={ongotocreate}
        // secondButtonTitle="Create a new Mobile Product!"
      />
    </>
  );
};

export default ordersContainer;

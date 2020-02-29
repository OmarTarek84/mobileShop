import React, { useEffect, useState, useCallback } from "react";
import {useDispatch} from 'react-redux';
import "./Orders.css";
import Orders from "../../components/Orders/Orders";
import { useSelector } from "react-redux";
import Spinner from "../../../shared/UI/Spinner/Spinner";
import * as ActionCreators from '../../../store/Actions/orders';

const ordersContainer = props => {
  const [isLoading, setisLoading] = useState(false);
  const [orderError, setOrderError] = useState(false);

  const orderData = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    onFetchOrders();
  }, [onFetchOrders]);

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
    <div className="orders">
      <h1>
        Your <span>Orders</span>
      </h1>
      {allOrders}
    </div>
  );
};

export default ordersContainer;

import React, { useEffect, useState } from "react";
import "./Orders.css";
import Orders from "../../components/Orders/Orders";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../../../shared/UI/Spinner/Spinner";

const ordersContainer = props => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [noOrders, setnoOrders] = useState(false);

  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);

  useEffect(() => {
    onFetchOrders();
  }, [onFetchOrders]);

  const onFetchOrders = () => {
    setisLoading(true);
    const requestBody = {
      query: `
                query Orders($userId: String) {
                    orders(userId: $userId) {
                        _id
                        order {
                          mobile {
                            _id
                            price
                            title
                          }
                          quantity
                        }
                        userId {
                          firstname
                        }
                        createdAt
                      }
                }
            `,
      variables: {
        userId: localStorage.getItem("userId")
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
        if (resData.data.data.orders.length <= 0) {
          setisLoading(false);
          setnoOrders(true);
        } else {
          setOrders(resData.data.data.orders);
          setnoOrders(false);
        }
        setisLoading(false);
      })
      .catch(err => {
        setisLoading(false);
      });
  };

  let allOrders;
  if (isLoading) {
    allOrders = <Spinner />;
  } else {
    if (noOrders) {
      allOrders = <h1>No Orders Yet!!</h1>;
    } else {
      allOrders = <Orders orders={orders} />;
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

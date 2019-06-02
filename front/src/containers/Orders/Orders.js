import React, { Component } from 'react';
import './Orders.css';
import Orders from '../../components/Orders/Orders';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';

class OrdersContainer extends Component {

    state = {
        orders: [],
        isLoading: false,
        noOrders: false
    }

    componentDidMount() {
        this.onFetchOrders();
    }

    onFetchOrders = () => {
        this.setState({isLoading: true});
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
                userId: localStorage.getItem('userId')
            }
        };

        axios.post('/graphql', requestBody, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
        }})
        .then(resData => {
            if (resData.data.data.orders.length <= 0) {
                this.setState({noOrders: true, isLoading: false});
            } else {
                this.setState({orders: resData.data.data.orders, isLoading: false, noOrders: false});
            }
        })
        .catch(err => {
            this.setState({isLoading: false});
        });
    }

    render() {
        let allOrders;
        if (this.state.isLoading) {
            allOrders = <Spinner />;
        } else {
            if (this.state.noOrders) {
                allOrders = <h1>No Orders Yet!!</h1>
            } else {
                allOrders = <Orders orders={this.state.orders} />
            }
        }
        return (
            <div className="orders">
                <h1>Your <span>Orders</span></h1>
                {allOrders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId
    }
}

export default connect(mapStateToProps)(OrdersContainer);
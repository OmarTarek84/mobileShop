import React, { Component } from 'react';
import Carts from '../../components/Carts/Carts';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';

class CartContainer extends Component {
    isActive = true;
    state = {
        carts: [],
        noItemsInCart: false,
        quantity: 1,
        totalPrice: 0,
        isLoading: false,
        onDisabled: false,
        showPayment: false
    }

    componentDidMount() {
        this.onFetchCarts();
    }

    componentWillUnmount() {
        this.isActive = false;
    }

    onFetchCarts = () => {
        this.setState({isLoading: true});
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
                userId: localStorage.getItem('userId')
            }
        };
        axios.post('http://localhost:8080/graphql', JSON.stringify(requestBody), {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
        }}).then(resData => {
            if (this.isActive) {
                resData.data.data.cart.map(car => {
                    this.setState(prevState => {
                        return {
                            totalPrice: prevState.totalPrice += (car.mobileId.price * car.quantity)
                        };
                    });
                });
                if (resData.data.data.cart.length <= 0) {
                    this.setState({noItemsInCart: true, isLoading: false});
                } else {
                    this.setState({carts: resData.data.data.cart, noItemsInCart: false, isLoading: false});
                }
            }
            })
            .catch(err => {
                this.setState({isLoading: false, noItemsInCart: true});
                setTimeout(() => {
                    this.props.history.push('/authenticate');
                }, 4000);
            });
    }

    onCartIncrement = (id) => {
        this.setState({isLoading: true});
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
        
        axios.post('http://localhost:8080/graphql', JSON.stringify(requestBody), {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
        }}).then(resData => {
                let existingCart = [...this.state.carts];
                const filteredCartIndex = existingCart.findIndex(p => {
                    return p._id === id;
                });
                existingCart[filteredCartIndex].quantity += 1;
                const newPrice = this.state.totalPrice + resData.data.data.incrementItemToCart.mobileId.price;
                this.setState({carts: existingCart, totalPrice: newPrice, isLoading: false});
            })
            .catch(err => {
                this.setState({isLoading: false});
            });

    };

    onCartDecrement = (id) => {
        this.setState({isLoading: true});
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
        
        axios.post('http://localhost:8080/graphql', JSON.stringify(requestBody), {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
        }}).then(resData => {
                let existingCart = [...this.state.carts];
                const filteredCartIndex = existingCart.findIndex(p => {
                    return p._id === id;
                });
                const filteredCart = existingCart.find(p => {
                    return p._id === id;
                });
                let newPrice;
                if (existingCart[filteredCartIndex].quantity > 1) {
                    existingCart[filteredCartIndex].quantity -= 1;
                    newPrice = this.state.totalPrice - resData.data.data.decrementItemToCart.mobileId.price;
                } else {
                    existingCart.splice(id, 1);
                    newPrice = this.state.totalPrice - filteredCart.mobileId.price;
                    if (existingCart.length <= 0) {
                        this.setState({noItemsInCart: true});
                    }
                }
                this.setState({carts: existingCart, totalPrice: newPrice, isLoading: false});
            })
            .catch(err => {
                this.setState({isLoading: false});
            });
    };

    onClearCart = () => {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
                mutation {
                    clearCart {
                    email
                    }
                }  
            `
        };
        axios.post('http://localhost:8080/graphql', requestBody, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
        }})
        .then(resData => {
            this.setState({totalPrice: 0, noItemsInCart: true, isLoading: false});
        });
    };

    removeCart = (id) => {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
                mutation RemoveCart($cartId: String!) {
                    removeCart(cartId: $cartId) {
                        email
                      }
                }
            `,
            variables: {
                cartId: id
            }
        };
        axios.post('http://localhost:8080/graphql', requestBody, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
        }})
        .then(resData => {
            this.onFetchCarts();
            this.setState({totalPrice: 0, isLoading: false});
        })
        .catch(err => {
            this.setState({isLoading: false});
        });
    };

    onOrder = () => {
        this.setState({onDisabled: true});
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

        axios.post('http://localhost:8080/graphql', requestBody, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
        }})
        .then(resData => {
            console.log(resData);
            this.props.history.push('/orders');
        })
        .catch(err => {
        });

    };

    backdropClose = () => {
        this.setState({showPayment: false});
    }

    render() {
        return (
            <div>
                {this.state.isLoading
                 ?
                 <div className="spinner-parent">
                     <Spinner />
                 </div>
                 :
                 this.state.noItemsInCart
                    ?
                    <h1 style={{textAlign: 'center', paddingTop: '40px'}}>No Items In Your Cart</h1>
                    :
                   <>
                   <h1 style={{textAlign: 'center', paddingTop: '30px', paddingBottom: '30px'}}>Your <span style={{color: '#07393C'}}>Cart</span></h1>
                   <Carts carts={this.state.carts}
                          onIncrementCart={this.onCartIncrement}
                          onDecrementCart={this.onCartDecrement}
                          subTotalPrice={this.state.totalPrice}
                          clearCart={this.onClearCart}
                          onRemoveCart={this.removeCart}
                          onOrder={this.onOrder} />
                   </>
                 }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        token: state.token,
        firstname: state.firstname
    }
}

export default connect(mapStateToProps)(CartContainer);
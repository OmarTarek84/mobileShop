import React, { Component } from 'react';
import './Mobiles.css';
import AllMobiles from '../../components/Mobiles/Mobiles';
import {connect} from 'react-redux';
import axios from 'axios';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Button from '../../components/UI/Button/Button';
import openSocket from 'socket.io-client';

class Mobiles extends Component {
    isActive = true
    state = {
        mobiles: [],
        noMobiles: false,
        cartAdded: false,
        cartAddedItem: null,
        buttonDisabled: false,
    }

    componentDidMount() {
        this.onFetchMobiles();
        const socket = openSocket('/');
        socket.on('newMobile', data => {
            this.setState(prevState => {
                return {
                    mobiles: prevState.mobiles.concat(data.mobile)
                };
            });
        });
        socket.on('editedMobile', (data) => {
            const mobileState = [...this.state.mobiles];
            const filteredMobileIndex = this.state.mobiles.findIndex(mobile => {
                return mobile._id === data.mobile._id;
            });
            mobileState[filteredMobileIndex] = data.mobile
            this.setState({mobiles: mobileState});
        })
    }

    componentWillUnmount() {
        this.isActive = false;
    }

    onGoToEdit = (id) => {
        const filteredMobile = this.state.mobiles.find(p => {
            return p._id === id;
        });
        localStorage.setItem('filteredMobile', JSON.stringify(filteredMobile));
        this.props.history.push({
            pathname: '/edit/' + id,
            search: '?edit=true',
            state: {filteredMobile: filteredMobile}
        });
    };

    onGoToDetail = (id) => {
        const filteredMobile = this.state.mobiles.find(p => {
            return p._id === id;
        });
        localStorage.setItem('filteredMobile', JSON.stringify(filteredMobile));
        this.props.history.push({
            pathname: '/mobile/' + id,
        });
    };

    onGoToCart = () => {
        this.props.history.push('/cart');
    }

    onFetchMobiles = () => {
        const requestBody = {
            query: `
            query {
                mobiles {
                  _id
                  title
                  description
                  price
                  model
                  imageUrl
                  createdAt
                  userId {
                    _id
                    firstname
                    lastname
                    email
                  }
                }
              }
            `
        };
        axios.post('/graphql', JSON.stringify(requestBody), {headers: {
            'Content-Type': 'application/json',
        }}).then(resData => {
                if (this.isActive) {
                    const mobiles = resData.data.data.mobiles;
                    if (mobiles.length <= 0) {
                        this.setState({noMobiles: true});
                    } else {
                        this.setState({mobiles: mobiles, noMobiles: false});
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    closeBackdrop = () => {
        this.setState({cartAdded: false});
    }

    addToCart = (mobile) => {
        this.setState({buttonDisabled: true});
        const requestBody = {
            query: `
                mutation AddToCart($mobile: AddedMobileToCartInput!) {
                    addToCart(mobile: $mobile) {
                        mobileId {
                        _id
                        title
                        price
                        createdAt
                        updatedAt
                        imageUrl
                        }
                        quantity
                        userId {
                        _id
                        email
                        firstname
                        lastname
                        }
                    }
                }
            `,
            variables: {
                mobile: {
                    _id: mobile._id,
                    title: mobile.title,
                    description: mobile.description,
                    model: mobile.model,
                    price: mobile.price,
                    imageUrl: mobile.imageUrl
                }
            }
        };

        axios.post('/graphql', requestBody, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
        }})
        .then(res => {
            this.setState({cartAdded: true, cartAddedItem: res.data.data.addToCart, buttonDisabled: false});
        });
    };

    render() {
        return (
            <>
            <h1 className="mobiles-title">Our <span>Mobiles</span></h1>
            <div className="mobiles">
                {this.state.noMobiles ? <p className="Nomobiles">No Mobiles Here Yet!!</p> : 
                            <AllMobiles mobiles={this.state.mobiles} 
                                        mobilesExist={this.state.mobiles.length > 0}
                                        clickedEdit={this.onGoToEdit}
                                        goToDetail={this.onGoToDetail}
                                        addCart={this.addToCart}
                                        buttonDisabled={this.state.buttonDisabled}/>
                }
            </div>
            {this.state.cartAdded
             ?
             <Backdrop show close={this.closeBackdrop}>
             <div className="item-added-parent">
                 <h3>Item added To Cart</h3>
                 <div className="item-added-image">
                     <img src={this.state.cartAddedItem.mobileId.imageUrl} alt="cart-mobile"/>
                 </div>
                 <p>{this.state.cartAddedItem.mobileId.title}</p>
                 <p>Price: <span>${this.state.cartAddedItem.mobileId.price}</span></p>
                 <div style={{marginTop: '7px'}}>
                     <Button clicked={this.closeBackdrop}>Continue Shopping</Button>
                 </div>
                 <div style={{marginTop: '5px'}}>
                     <Button clicked={this.onGoToCart}>Go To Cart</Button>
                 </div>
             </div>
            </Backdrop>
            :
            null
            }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Mobiles);
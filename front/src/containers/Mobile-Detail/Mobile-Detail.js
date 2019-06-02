import React, { Component } from 'react';
import MobileDetail from '../../components/Mobile-detail/Mobile-detail';
import axios from 'axios';
import {connect} from 'react-redux';

class MobileDetailContainer extends Component {
    state = {
        filteredMobile: null,
        buttonDisabled: false
    }
    componentWillMount() {
        this.setState({filteredMobile: JSON.parse(localStorage.getItem('filteredMobile'))});
    }

    addToCart = (id, title, description, model, price, imageUrl) => {
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
                    _id: id,
                    title: title,
                    description: description,
                    model: model,
                    price: price,
                    imageUrl: imageUrl
                }
            }
        };

        axios.post('/graphql', requestBody, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
        }})
        .then(res => {
            this.props.history.push('/cart');
        });
    };

    onGoToMobiles = () => {
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <MobileDetail title={this.state.filteredMobile.title}
                              description={this.state.filteredMobile.description}
                              price={this.state.filteredMobile.price}
                              model={this.state.filteredMobile.model}
                              onGoToMobiles={this.onGoToMobiles}
                              date={this.state.filteredMobile.createdAt}
                              firstname={this.state.filteredMobile.userId.firstname}
                              id={this.state.filteredMobile._id}
                              lastname={this.state.filteredMobile.userId.lastname}
                              useremail={this.state.filteredMobile.userId.email}
                              image={this.state.filteredMobile.imageUrl}
                              addToCart={this.addToCart}
                              onDisabled={this.state.buttonDisabled}
                              mobileUserId={this.state.filteredMobile.userId._id}
                              userSignedin={this.props.userId} />
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

export default connect(mapStateToProps)(MobileDetailContainer);
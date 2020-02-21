import React, { useState, useEffect } from 'react';
import MobileDetail from '../../components/Mobile-detail/Mobile-detail';
import axios from 'axios';
import {useSelector} from 'react-redux';

const mobileDetailContainer = (props) => {
    const [buttonDisabled, setbuttonDisabled] = useState(false);
    const filteredMobile = JSON.parse(localStorage.getItem('filteredMobile'));

    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);

    const addToCart = (id, title, description, model, price, imageUrl) => {
        setbuttonDisabled(true);
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
            'Authorization': 'Bearer ' + token
        }})
        .then(res => {
            props.history.push('/cart');
        });
    };

    const onGoToMobiles = () => {
        props.history.push('/');
    }
        return (
            <div>
                <MobileDetail title={filteredMobile.title}
                              description={filteredMobile.description}
                              price={filteredMobile.price}
                              model={filteredMobile.model}
                              onGoToMobiles={onGoToMobiles}
                              date={filteredMobile.createdAt}
                              firstname={filteredMobile.userId.firstname}
                              id={filteredMobile._id}
                              lastname={filteredMobile.userId.lastname}
                              useremail={filteredMobile.userId.email}
                              image={filteredMobile.imageUrl}
                              addToCart={addToCart}
                              onDisabled={buttonDisabled}
                              mobileUserId={filteredMobile.userId._id}
                              userSignedin={userId} />
            </div>
        )
    }

export default mobileDetailContainer;
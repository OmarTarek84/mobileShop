import React, { useState, useEffect, useCallback } from 'react';
import './Mobiles.css';
import AllMobiles from '../../components/Mobiles/Mobiles';
import {useSelector, useDispatch} from 'react-redux';
import * as ActionCreators from '../../../store/Actions/mobiles';
import axios from 'axios';
import Backdrop from '../../../shared/UI/Backdrop/Backdrop';
import Button from '../../../shared/UI/Button/Button';
import openSocket from 'socket.io-client';

const mobiles = (props) => {

    const [mobiles, setMobiles] = useState([]);
    const [noMobiles, setNoMobiles] = useState(false);
    const [cartAdded, setcartAdded] = useState(false);
    const [cartAddedItem, setcartAddedItem] = useState(null);
    const [buttonDisabled, setbuttonDisabled] = useState(false);
    const [mobError, setmobError] = useState(false);

    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);
    const mobilesData = useSelector(state => state.mobiles.mobiles);

    const socket = openSocket('http://localhost:8080');

    useEffect(() => {
        onFetchMobiles();
        socket.on('newMobile', data => {
            setMobiles(currentMobiles => [
                ...currentMobiles,
                data.mobile
            ]);
            // this.setState(prevState => {
            //     return {
            //         mobiles: prevState.mobiles.concat(data.mobile)
            //     };
            // });
        });
        socket.on('editedMobile', (data) => {
            const mobileState = [...mobiles];
            const filteredMobileIndex = mobileState.findIndex(mobile => {
                return mobile._id === data.mobile._id;
            });
            mobileState[filteredMobileIndex] = data.mobile;
            setMobiles(currentMobs => [
                ...currentMobs,
                mobileState
            ]);
            // this.setState({mobiles: mobileState});
        })
    }, [onFetchMobiles, dispatch])

    // componentDidMount() {

    // }

    // componentWillUnmount() {
    //     this.isActive = false;
    // }

    const onGoToEdit = (id) => {
        const filteredMobile = mobilesData.find(p => {
            return p._id === id;
        });
        localStorage.setItem('filteredMobile', JSON.stringify(filteredMobile));
        props.history.push({
            pathname: '/edit/' + id,
            search: '?edit=true',
            state: {filteredMobile: filteredMobile}
        });
    };

    const onGoToDetail = (id) => {
        // const filteredMobile = mobilesData.find(p => {
        //     return p._id === id;
        // });
        props.history.push({
            pathname: '/mobile/' + id,
        });
    };

    const onGoToCart = () => {
        props.history.push('/cart');
    }

    const onFetchMobiles = useCallback(() => {
        dispatch(ActionCreators.fetchMobiles())
        .then(() => setmobError(false))
        .catch(() => setmobError(true));
    }, [dispatch]);

    const closeBackdrop = () => {
        setcartAdded(false);
        // this.setState({cartAdded: false});
    }

    const addToCart = (mobile) => {
        setbuttonDisabled(true);
        // this.setState({buttonDisabled: true});
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

        axios.post('http://localhost:8080/graphql', requestBody, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }})
        .then(res => {
            console.log(res.data.data.addToCart);
            setcartAddedItem(res.data.data.addToCart);
            setcartAdded(true);
            setbuttonDisabled(false);
            // this.setState({cartAdded: true, cartAddedItem: res.data.data.addToCart, buttonDisabled: false});
        });
    };

        return (
            <>
            <h1 className="mobiles-title">Our <span>Mobiles</span></h1>
            <div className="mobiles">
                {noMobiles ? <p className="Nomobiles">No Mobiles Here Yet!!</p> : 
                            <AllMobiles mobiles={mobilesData} 
                                        mobilesExist={mobilesData.length > 0}
                                        clickedEdit={onGoToEdit}
                                        goToDetail={onGoToDetail}
                                        addCart={addToCart}
                                        buttonDisabled={buttonDisabled}
                                        error={mobError} />
                }
            </div>
            {cartAdded
             ?
             <Backdrop show close={closeBackdrop}>
             <div className="item-added-parent">
                 <h3>Item added To Cart</h3>
                 <div className="item-added-image">
                     <img src={cartAddedItem.mobileId.imageUrl} alt="cart-mobile"/>
                 </div>
                 <p>{cartAddedItem.mobileId.title}</p>
                 <p>Price: <span>${cartAddedItem.mobileId.price}</span></p>
                 <div style={{marginTop: '7px'}}>
                     <Button clicked={closeBackdrop}>Continue Shopping</Button>
                 </div>
                 <div style={{marginTop: '5px'}}>
                     <Button clicked={onGoToCart}>Go To Cart</Button>
                 </div>
             </div>
            </Backdrop>
            :
            null
            }
            </>
        )
}

export default mobiles;
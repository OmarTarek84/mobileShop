import React from 'react';
import './Mobiles.css';
import Mobile from './Mobile/Mobile';
import Spinner from '../UI/Spinner/Spinner';

const allMobiles = props => {
    let mobileList = <Spinner />;
    if (props.mobilesExist) {
        mobileList = props.mobiles.map(mobile => {
            return <Mobile key={mobile._id} 
                           id={mobile._id}
                           title={mobile.title}
                           price={mobile.price}
                           firstname={mobile.userId.firstname}
                           lastname={mobile.userId.lastname}
                           editClicked={props.clickedEdit.bind(this, mobile._id)}
                           mobileUserID={mobile.userId._id}
                           detailClicked={props.goToDetail.bind(this, mobile._id)}
                           image={mobile.imageUrl}
                           addToCart={props.addCart.bind(this, mobile)}
                           onDisabled={props.buttonDisabled} />;
        })
    }
    return (
        <>
            {mobileList}
        </>
    )
};

export default allMobiles;
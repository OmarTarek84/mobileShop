import React from 'react';
import './Mobile-detail.css';
import Button from '../../../shared/UI/Button/Button';

const mobileDetail = props => {
    return (
        <div className="mobile-detail">
            <h1>{props.title}</h1>
            <div className="mobile-detail_flex">
                <div className="mobile-detail_flex_image">
                    <img src={props.image} alt="myImage" />
                </div>
                <div className="mobile-detail_flex_info">
                    <h3>Model: <span>{props.model}</span></h3>
                    <h5>Price: <span>${props.price}</span></h5>
                    <div className="mobile-detail_flex_info_desc">
                        <span>Some Info About This Mobile:</span>
                        <p>{props.description}</p>
                    </div>
                    <div className="createAt">
                        <p>This Mobile Product was created on: <span>{props.date}</span></p>
                        <p>created By: <span>{props.firstname} {props.lastname}</span></p>
                        <p>Mobile Product Creator Contact: <span>{props.useremail}</span></p>
                    </div>
                    <div className="mobile-detail_flex_info_buttons">
                        <Button clicked={props.onGoToMobiles}>Back To Mobile List</Button>
                        {props.userSignedin !== props.mobileUserId
                         ?
                         <Button clicked={props.addToCart.bind(this, props.mobile)}
                         disabled={props.onDisabled}>Add To Cart</Button>
                         :
                         null
                         }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default mobileDetail;
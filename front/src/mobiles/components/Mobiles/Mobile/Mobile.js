import React from 'react';
import Button from '../../../../shared/UI/Button/Button';
import './Mobile.css';

const mobile = props => {
    return (
        <div className="mobile-card" key={props.id}>
            {props.isAuthorized && props.userId !== props.mobileUserID
             ?
             <div className="AddToCart">
                <Button clicked={props.addToCart} disabled={props.onDisabled}>Add To Cart</Button>
             </div>
             :
             null
             }
            <div className="mobile-image">
                <img src={props.image} alt="mobileImage" />
            </div>
            <div className="mobile-type-price">
                <div className="mobile-type">
                    <p>{props.title}</p>
                </div>
                <div className="mobile-price">
                    <p>${props.price}</p>
                </div>
            </div>
            <div className="createdby">
                <p>Created By: <span style={{fontWeight: 'bolder'}}>{props.firstname} {props.lastname}</span></p>
            </div>
            {props.isAuthorized 
             ?
             <div className="buttons">
             {props.userId === props.mobileUserID
             ?
             <>
             <Button clicked={props.editClicked}>Edit</Button>
             <Button clicked={props.detailClicked}>Details</Button>
             </>
             :
             <Button clicked={props.detailClicked}>Details</Button>}
            </div>
            :
             null}
        </div>
    )
};

export default mobile;
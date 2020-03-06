import React from "react";
import "./Mobiles.css";
import Mobile from "./Mobile/Mobile";
import Spinner from "../../../shared/UI/Spinner/Spinner";

const allMobiles = props => {
  let mobileList;
  if (props.loading) {
      mobileList = <Spinner />
  } else if (props.mobilesExist) {
    mobileList = props.mobiles.map(mobile => {
      return (
        <Mobile
          key={mobile._id}
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
          onDisabled={props.buttonDisabled}
          userId={props.userId}
          isAuthorized={props.isAuthorized}
        />
      );
    });
  } else if (props.error) {
    return <h2>An Error Occurred</h2>;
  }
  return <>{mobileList}</>;
};

export default allMobiles;

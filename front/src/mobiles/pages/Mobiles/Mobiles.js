import React, { useState, useEffect, useCallback } from "react";
import "./Mobiles.css";
import AllMobiles from "../../components/Mobiles/Mobiles";
import { useSelector, useDispatch } from "react-redux";
import * as ActionCreators from "../../../store/Actions/mobiles";
import Backdrop from "../../../shared/UI/Backdrop/Backdrop";
import Button from "../../../shared/UI/Button/Button";
import openSocket from "socket.io-client";
import ErrorModal from "../../../shared/UI/ErrorModal/ErrorModal";
import * as CartActionCreator from "../../../store/Actions/cart";

const mobiles = props => {
  const [cartAdded, setcartAdded] = useState(false);
  const [cartAddedItem, setcartAddedItem] = useState(null);
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [mobError, setmobError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const mobilesData = useSelector(state => state.mobiles.mobiles);
  const userId = useSelector(state => state.auth.userId);
  const isAuthorized = useSelector(state => state.auth.token !== null);

  const socket = openSocket("http://localhost:8080");

  const onFetchMobiles = useCallback(() => {
    setmobError("");
    setLoading(true);
    dispatch(ActionCreators.fetchMobiles())
      .then(() => {
        setmobError("");
        setLoading(false);
      })
      .catch(err => {
        setmobError(err);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    onFetchMobiles();
  }, [dispatch, onFetchMobiles]);


  useEffect(() => {
    socket.on("newMobile", data => {
      dispatch(ActionCreators.createMobileSocket(data.mobile));
    });
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("editedMobile", data => {
      dispatch(
        ActionCreators.editMobileSocket(
          data.mobile._id,
          data.mobile.title,
          data.mobile.description,
          data.mobile.price,
          data.mobile.model,
          data.mobile.imageUrl
        )
      );
    });
    return () => {
      socket.close();
    };
  }, []);

  const onGoToEdit = id => {
    props.history.push({
      pathname: "/edit/" + id,
      search: "?edit=true"
    });
  };

  const onGoToDetail = id => {
    props.history.push({
      pathname: "/mobile/" + id
    });
  };

  const onGoToCart = () => {
    props.history.push({
      pathname: "/cart"
    });
  };

  const closeBackdrop = () => {
    setcartAdded(false);
  };

  const ongotocreate = () => {
    props.history.push("/new");
  };

  const addToCart = mobile => {
    setbuttonDisabled(true);
    dispatch(CartActionCreator.addToCart(mobile))
      .then(() => {
        setbuttonDisabled(false);
        setcartAddedItem(mobile);
        setcartAdded(true);
      })
      .catch(err => {
        setbuttonDisabled(false);
      });
  };

  return (
    <>
      <h1 className="mobiles-title">
        Our <span>Mobiles</span>
      </h1>
      <div className="mobiles">
        <AllMobiles
          mobiles={mobilesData}
          mobilesExist={mobilesData.length > 0}
          clickedEdit={onGoToEdit}
          goToDetail={onGoToDetail}
          addCart={addToCart}
          buttonDisabled={buttonDisabled}
          error={mobError}
          loading={!!loading}
          userId={userId}
          isAuthorized={isAuthorized}
        />
      </div>
      {cartAdded ? (
        <Backdrop show close={closeBackdrop}>
          <div className="item-added-parent">
            <h3>Item added To Cart</h3>
            <div className="item-added-image">
              <img src={cartAddedItem.imageUrl} alt="cart-mobile" />
            </div>
            <p>{cartAddedItem.title}</p>
            <p>
              Price: <span>${cartAddedItem.price}</span>
            </p>
            <div style={{ marginTop: "7px" }}>
              <Button clicked={closeBackdrop}>Continue Shopping</Button>
            </div>
            <div style={{ marginTop: "5px" }}>
              <Button clicked={onGoToCart}>Go To Cart</Button>
            </div>
          </div>
        </Backdrop>
      ) : null}
      <ErrorModal
        open={!!mobError}
        onClose={() => setmobError("")}
        errorMessage={
          mobError.response &&
          mobError.response.data &&
          mobError.response.data.errors[0]
            ? mobError.response.data.errors[0].message
            : "Unknown Error, We'll fix it soon"
        }
        firstButton={true}
        firstButtonMethod={onFetchMobiles}
        firstButtonTitle="Try Again Now"
        secondButton={true}
        secondButtonMethod={ongotocreate}
        secondButtonTitle="Create a new Mobile Product!"
      />
    </>
  );
};

export default mobiles;

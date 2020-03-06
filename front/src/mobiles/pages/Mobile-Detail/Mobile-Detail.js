import React, { useState, useEffect, useCallback } from "react";
import MobileDetail from "../../components/Mobile-detail/Mobile-detail";
import { useSelector, useDispatch } from "react-redux";
import * as CartActionCreator from "../../../store/Actions/cart";
import * as ActionCreators from "../../../store/Actions/mobiles";
import ErrorModal from "../../../shared/UI/ErrorModal/ErrorModal";
import Spinner from "../../../shared/UI/Spinner/Spinner";

const mobileDetailContainer = props => {
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const dispatch = useDispatch();
  const [mobError, setmobError] = useState(false);
  const [loading, setLoading] = useState(false);
  const filteredMobile = useSelector(state =>
    state.mobiles.mobiles.find(p => p._id === props.match.params.id)
  );

  const userId = useSelector(state => state.auth.userId);

  const addToCart = mobile => {
    setbuttonDisabled(true);
    console.log(mobile);
    // this.setState({buttonDisabled: true});
    dispatch(CartActionCreator.addToCart(mobile))
      .then(() => {
        setLoading(false);
        setbuttonDisabled(false);
        props.history.push('/cart');
      })
      .catch(err => {
        setmobError(err);
        setLoading(false);
        setbuttonDisabled(false);
      });
  };

  const onFetchMobiles = useCallback(() => {
    setmobError("");
    setLoading(true);
    dispatch(ActionCreators.fetchMobiles())
      .then(() => {
        setmobError("");
        setLoading(false);
      })
      .catch(err => {
        console.log(err.response);
        setmobError(err);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (!filteredMobile) {
      onFetchMobiles();
    }
  }, [dispatch, onFetchMobiles]);

  const onGoToMobiles = () => {
    props.history.push("/");
  };

  let mobileDetail;
  if (!loading && filteredMobile) {
    mobileDetail = (
      <MobileDetail
        title={filteredMobile.title}
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
        userSignedin={userId}
        mobile={filteredMobile}
      />
    );
  } else {
    mobileDetail = <Spinner />;
  }

  return (
    <div>
      {mobileDetail}
      <ErrorModal
        open={!!mobError}
        onClose={() => setmobError("")}
        errorMessage={
          mobError.response &&
          mobError.response.data &&
          mobError.response.data.errors[0]
            ? mobError.response.data.errors[0].message
            : "Unknown Error, Maybe Your session has expired"
        }
        firstButton={true}
        firstButtonMethod={() => setmobError("")}
        firstButtonTitle="Try Again Now"
        // secondButton={true}
        // secondButtonMethod={ongotocreate}
        // secondButtonTitle="Create a new Mobile Product!"
      />
    </div>
  );
};

export default mobileDetailContainer;

import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as ActionCreators from "../../../store/Actions/auth";

const logout = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ActionCreators.logout());
    }, [dispatch])
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
};

export default logout;

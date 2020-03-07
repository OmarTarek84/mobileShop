import React, { useEffect, Suspense, useCallback } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Layout from "./Layout/Layout/Layout";
import * as AuthActionCreators from "./store/Actions/auth";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./shared/UI/Spinner/Spinner";

const Signin = React.lazy(() => {
  return import("./auth/pages/Signin/Signin");
});

const UpdateMobiles = React.lazy(() => {
  return import('./mobiles/pages/UpdateMobiles/UpdateMobiles');
})

const Auth = React.lazy(() => {
  return import("./auth/pages/Auth/Auth");
});

const Logout = React.lazy(() => {
  return import("./auth/pages/Logout/Logout");
});

const Mobiles = React.lazy(() => {
  return import("./mobiles/pages/Mobiles/Mobiles");
});

const CreateMobiles = React.lazy(() => {
  return import("./mobiles/pages/CreateMobiles/CreateMobiles");
});
const MobileDetailContainer = React.lazy(() => {
  return import("./mobiles/pages/Mobile-Detail/Mobile-Detail");
});
const CartContainer = React.lazy(() => {
  return import("./carts/pages/Cart/Cart");
});
const OrdersContainer = React.lazy(() => {
  return import("./orders/pages/Orders/Orders");
});

const app = () => {
  const isAuthenticated = useSelector(state => state.auth.token != null);
  const dispatch = useDispatch();
  let logoutTimer;

  const logout = useCallback(() => {
    dispatch(AuthActionCreators.logout());
  }, [dispatch]);

  const login = useCallback((token, userId, firstName, expDate) => {
    dispatch(AuthActionCreators.login(token, userId, firstName, expDate));
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expDate = localStorage.getItem("expDate");
    if (token && expDate) {
      const remainingTime = new Date(expDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [localStorage.getItem("expDate"), localStorage.getItem("token"), logout]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpDate = localStorage.getItem('expDate');
    const storedFirstName = localStorage.getItem("firstname");
    const storedUserId = localStorage.getItem("userId");
    if (
      storedUserId &&
      storedToken &&
      new Date(storedExpDate) > new Date()
    ) {
      login(storedToken, storedUserId, storedFirstName, storedExpDate);
    }
  }, [login]);

  return (
    <Layout>
      <Suspense
        fallback={
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%"
            }}
          >
            <Spinner />
          </div>
        }
      >
        <Switch>
          {!isAuthenticated ? (
            <Route
              path="/authenticate"
              exact
              render={props => <Auth {...props} />}
            />
          ) : null}
          {!isAuthenticated ? (
            <Route
              path="/signin"
              exact
              render={props => <Signin {...props} />}
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/logout"
              exact
              render={props => <Logout {...props} />}
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/new"
              exact
              render={props => <CreateMobiles {...props} />}
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/edit/:id"
              exact
              render={props => <UpdateMobiles {...props} />}
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/cart"
              exact
              render={props => <CartContainer {...props} />}
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/edit/:id"
              exact
              render={props => <CreateMobiles {...props} />}
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/orders"
              exact
              render={props => <OrdersContainer {...props} />}
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/mobile/:id"
              exact
              render={props => <MobileDetailContainer {...props} />}
            />
          ) : null}
          <Route path="/" exact render={props => <Mobiles {...props} />} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default withRouter(app);

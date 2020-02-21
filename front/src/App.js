import React, { useState, useEffect } from 'react';
import './App.css';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Mobiles from './containers/Mobiles/Mobiles';
import Auth from './containers/Auth/Auth';
import Signin from './containers/Auth/Signin/Signin';
import Logout from './containers/Auth/Logout/Logout';
import CreateMobiles from './containers/CreateMobiles/CreateMobiles';
import * as ActionCreators from './store/Actions/auth';
import MobileDetailContainer from './containers/Mobile-Detail/Mobile-Detail';
import CartContainer from './containers/Cart/Cart';
import OrdersContainer from './containers/Orders/Orders';
import {useSelector, useDispatch} from 'react-redux';
import ErrorHandler from './hoc/ErrorHandler';
import axios from 'axios';

const app = () => {

  const isAuthenticated = useSelector(state => state.auth.token != null);
  console.log(isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('effect');
    dispatch(ActionCreators.checkAuthState());
  }, []);
    return (
      <Layout>
        <Switch>
          {!isAuthenticated ? <Route path="/authenticate" exact component={Auth} /> : null}
          {!isAuthenticated ? <Route path="/signin" exact component={Signin} /> : null}
          {isAuthenticated ? <Route path="/logout" exact component={Logout} /> : null}
          {isAuthenticated ? <Route path="/new" exact component={CreateMobiles} /> : null}
          {isAuthenticated ? <Route path="/cart" exact component={CartContainer} /> : null}
          {isAuthenticated ? <Route path="/edit/:id" exact component={CreateMobiles} /> : null}
          {isAuthenticated ? <Route path="/orders" exact component={OrdersContainer} /> : null}
          {isAuthenticated ? <Route path="/mobile/:id" exact component={MobileDetailContainer} /> : null}
          <Route path="/" exact component={Mobiles} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }

export default ErrorHandler(withRouter(app), axios);

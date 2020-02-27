import React, { useState, useEffect } from 'react';
import './App.css';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Layout from './Layout/Layout/Layout';
import Mobiles from './mobiles/pages/Mobiles/Mobiles';
import Auth from './auth/pages/Auth/Auth';
import Signin from './auth/pages/Signin/Signin';
import Logout from './auth/pages/Logout/Logout';
import CreateMobiles from './mobiles/pages/CreateMobiles/CreateMobiles';
import * as ActionCreators from './store/Actions/auth';
import MobileDetailContainer from './mobiles/pages/Mobile-Detail/Mobile-Detail';
import CartContainer from './carts/pages/Cart/Cart';
import OrdersContainer from './orders/pages/Orders/Orders';
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

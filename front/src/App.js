import React, { Component } from 'react';
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
import {connect} from 'react-redux';
import ErrorHandler from './hoc/ErrorHandler';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }
  render() {
    return (
      <Layout>
        <Switch>
          {!this.props.isAuthenticated ? <Route path="/authenticate" exact component={Auth} /> : null}
          {!this.props.isAuthenticated ? <Route path="/signin" exact component={Signin} /> : null}
          {this.props.isAuthenticated ? <Route path="/logout" exact component={Logout} /> : null}
          {this.props.isAuthenticated ? <Route path="/new" exact component={CreateMobiles} /> : null}
          {this.props.isAuthenticated ? <Route path="/cart" exact component={CartContainer} /> : null}
          {this.props.isAuthenticated ? <Route path="/edit/:id" exact component={CreateMobiles} /> : null}
          {this.props.isAuthenticated ? <Route path="/orders" exact component={OrdersContainer} /> : null}
          {this.props.isAuthenticated ? <Route path="/mobile/:id" exact component={MobileDetailContainer} /> : null}
          <Route path="/" exact component={Mobiles} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(ActionCreators.checkAuthState())
  }
}

export default ErrorHandler(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)), axios);

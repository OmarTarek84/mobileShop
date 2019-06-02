import React, {Component} from 'react';
import './NavigationItems.css';
import NavigationItem from '../../components/NavigationItem/NavigationItem';
import MobileLogo from '../../images/logo.svg';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import {connect} from 'react-redux';

class NavigationItems extends Component {
    state = {
        sideDrawerClose: true
    }

    sideDrawerClose = () => {
        this.setState({sideDrawerClose: true});
    }

    sideDrawerOpen = () => {
        this.setState({sideDrawerClose: false});
    }

    render() {
        let style = {
            transform: 'translateX(0)'
        }
        if (this.state.sideDrawerClose) {
            style = {
                transform: 'translateX(-105%)'
            }
        } else {
            style = {
                transform: 'translateX(0)'
            }
        }

        let navigationLists;

        if (this.props.isAuthorized) {
            navigationLists = (
                <ul>
                    <NavigationItem close={this.sideDrawerClose} link="/">Mobiles</NavigationItem>
                    <NavigationItem close={this.sideDrawerClose} link="/new">Create</NavigationItem>
                    <NavigationItem close={this.sideDrawerClose} link="/cart">My Cart</NavigationItem>
                    <NavigationItem close={this.sideDrawerClose} link="/orders">My Orders</NavigationItem>
                    <NavigationItem close={this.sideDrawerClose} link="/logout">Log Out</NavigationItem>
                </ul>
            )
        } else {
            navigationLists = (
                <ul>
                    <NavigationItem close={this.sideDrawerClose} link="/">Mobiles</NavigationItem>
                    <NavigationItem close={this.sideDrawerClose} link="/authenticate">Sign Up</NavigationItem>
                    <NavigationItem close={this.sideDrawerClose} link="/signin">Sign In</NavigationItem>
                </ul>
            )
        }

        return (
            <>
            <nav className="big-screen">
                <div className="logo">
                    <img src={MobileLogo} alt="mobile" />
                    {this.props.firstname
                    ?
                    <p style={{display: 'inline-block', marginLeft: '10px', color: 'white'}}>
                    Welcome {this.props.firstname}
                    </p>
                    :
                    null
                    }
                </div>
                <div className="navitems">
                    {navigationLists}
                </div>
            </nav>
            <nav className="small-screen">
                <div className="nav-sidedrawer">
                    <div className="toggleButton" onClick={this.sideDrawerOpen}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="sidedrawer" style={style}>
                        <div className="sidedrawer-close" onClick={this.sideDrawerClose}>
                            <p>Close</p>
                        </div>
                        <div className="sidedrawer-nav">
                            {navigationLists}
                        </div>
                    </div>
                </div>
                <div className="logo">
                    <img src={MobileLogo} alt="mobile" />
                </div>
            </nav>
            <Backdrop close={this.sideDrawerClose} show={!this.state.sideDrawerClose} />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        firstname: state.firstname,
        isAuthorized: state.token !== null
    }
}

export default connect(mapStateToProps)(NavigationItems);
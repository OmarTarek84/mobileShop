import React, {useState} from 'react';
import './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import MobileLogo from '../../../images/logo.svg';
import Backdrop from '../../../shared/UI/Backdrop/Backdrop';
import {useSelector} from 'react-redux';

const navigationItems = props => {

    const [sideDrawerClose, setsideDrawerClose] = useState(true);
    const firstname = useSelector(state => state.auth.firstname);
    const userId = useSelector(state => state.auth.userId);
    const token = useSelector(state => state.auth.token);

    const sideDrawerClosee = () => {
        setsideDrawerClose(true);
    }

    const sideDrawerOpen = () => {
        setsideDrawerClose(false);
    }

        let style = {
            transform: 'translateX(0)'
        }
        if (sideDrawerClose) {
            style = {
                transform: 'translateX(-105%)'
            }
        } else {
            style = {
                transform: 'translateX(0)'
            }
        }

        let navigationLists;

        if (token) {
            navigationLists = (
                <ul>
                    <NavigationItem close={sideDrawerClosee} link="/">Mobiles</NavigationItem>
                    <NavigationItem close={sideDrawerClosee} link="/new">Create</NavigationItem>
                    <NavigationItem close={sideDrawerClosee} link="/cart">My Cart</NavigationItem>
                    <NavigationItem close={sideDrawerClosee} link="/orders">My Orders</NavigationItem>
                    <NavigationItem close={sideDrawerClosee} link="/logout">Log Out</NavigationItem>
                </ul>
            )
        } else {
            navigationLists = (
                <ul>
                    <NavigationItem close={sideDrawerClosee} link="/">Mobiles</NavigationItem>
                    <NavigationItem close={sideDrawerClosee} link="/authenticate">Sign Up</NavigationItem>
                    <NavigationItem close={sideDrawerClosee} link="/signin">Sign In</NavigationItem>
                </ul>
            )
        }

        return (
            <>
            <nav className="big-screen">
                <div className="logo">
                    <img src={MobileLogo} alt="mobile" />
                    {firstname
                    ?
                    <p style={{display: 'inline-block', marginLeft: '10px', color: 'white'}}>
                    Welcome {firstname}
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
                    <div className="toggleButton" onClick={sideDrawerOpen}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="sidedrawer" style={style}>
                        <div className="sidedrawer-close" onClick={sideDrawerClosee}>
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
            <Backdrop close={sideDrawerClosee} show={!sideDrawerClose} />
            </>
        )
    }

export default navigationItems;
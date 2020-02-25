import * as ActionTypes from './ActionTypes';
import axios from 'axios';

export const authSuccess = (token, userId, firstname) => {
    return {
        type: ActionTypes.LOGIN,
        token: token,
        userId: userId,
        firstname: firstname,
        error: null
    };
};

export const googleAuth = (data) => {
    return dispatch => {
        return axios.post('/oauth/google', {
            access_token: data.accessToken
        }).then(res => {
            dispatch(login(res.data.token, res.data.userId, res.data.firstname));
        })
        .catch(err => {
            console.log(err);
        });
    };
};

export const login = (token, userId, firstname) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('expDate', new Date().getTime() + (1 * 60 * 60 * 1000));
    return dispatch => {
        dispatch(authSuccess(token, userId, firstname));
        // dispatch(signoutafterOneHour());
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstname');
    localStorage.removeItem('expDate');
    return {
        type: ActionTypes.LOGOUT
    };
};

export const signoutafterOneHour = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, 3600 * 1000);
    };
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const expDate = new Date(localStorage.getItem('expDate'));
        const userId = localStorage.getItem('userId');
        if (!token) {
            dispatch(logout());
        } else {
            if (new Date() > expDate) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, userId, localStorage.getItem('firstname')));
                dispatch(signoutafterOneHour());
            }
        }
    };
};
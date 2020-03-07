import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {
    token: null,
    userId: null,
    firstname: null,
    expDate: null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                firstname: action.firstname,
                expDate: action.expDate,
                error: null
            };
        case ActionTypes.LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                firstname: null,
                error: null,
                expDate: null
            }
        default:
            return state;
    }
};

export default authReducer;
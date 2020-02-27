import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {
    carts: []
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_CARTS:
            return {
                ...state,
                carts: action.carts
            }
        default:
            return state;
    }
}

export default cartReducer;
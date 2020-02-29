import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {
    orders: []
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ORDERS:
            return {
                ...state,
                orders: action.orders
            }
        case ActionTypes.ADD_ORDER:
            return {
                ...state,
                orders: state.orders.concat(action.order)
            }
        default:
            return state;
    }
}

export default orderReducer;
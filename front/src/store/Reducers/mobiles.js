import { FETCH_MOBILES, CREATE_MOBILE } from "../Actions/ActionTypes";

const initialState = {
    mobiles: [],
};

const mobileReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MOBILES:
            return {
                ...state,
                mobiles: action.mobiles,
            };
        case CREATE_MOBILE:
            return {
                ...state,
                mobiles: state.mobiles.concat(action.mobile)
            }
        default:
            return state
    }
}

export default mobileReducer;
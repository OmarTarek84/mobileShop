import { FETCH_MOBILES, CREATE_MOBILE, EDIT_MOBILE } from "../Actions/ActionTypes";

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
            };
        case EDIT_MOBILE:
            const mobilesAll = [...state.mobiles];
            const targetedMobileIndex = state.mobiles.findIndex(p => p._id === action.id);
            mobilesAll[targetedMobileIndex].title = action.title;
            mobilesAll[targetedMobileIndex].description = action.description;
            mobilesAll[targetedMobileIndex].price = action.price;
            mobilesAll[targetedMobileIndex].model = action.model;
            mobilesAll[targetedMobileIndex].imageUrl = action.imageUrl;
            return {
                ...state,
                mobiles: mobilesAll
            };
        default:
            return state;
    }
}

export default mobileReducer;
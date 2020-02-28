import * as ActionTypes from "../Actions/ActionTypes";

const initialState = {
  carts: [],
  totalPrice: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CARTS:
      return {
        ...state,
        carts: action.carts,
        totalPrice: action.totalPrice
      };
    case ActionTypes.INCREMENT_CART:
      let existingCarts = [...state.carts];
      const filteredCartIndex = existingCarts.findIndex(p => {
        return p._id === action.id;
      });
      existingCarts[filteredCartIndex].quantity += 1;
      let price = 0;
      existingCarts.forEach(car => {
        price += +car.mobileId.price * car.quantity;
      });
      return {
        ...state,
        carts: existingCarts,
        totalPrice: price
      };
    case ActionTypes.DECREMENT_CART:
      let existingCartss = [...state.carts];
      const filteredCartIndexx = existingCartss.findIndex(p => {
        return p._id === action.id;
      });
      let finalPrice = state.totalPrice - existingCartss[filteredCartIndexx].mobileId.price;
      if (existingCartss[filteredCartIndexx].quantity > 1) {
        existingCartss[filteredCartIndexx].quantity -= 1;
      } else {
        existingCartss = existingCartss.filter(p => p._id !== existingCartss[filteredCartIndexx]._id)
      }
      return {
        ...state,
        carts: existingCartss,
        totalPrice: finalPrice
      };
    case ActionTypes.ADD_TO_CART:
        const targetedCart = state.carts.find(p => p.mobileId._id === action.cart.mobileId._id);
        const targetedCartIndex = state.carts.findIndex(p => p.mobileId._id === action.cart.mobileId._id);
        let cartsRes = [...state.carts];
        if (!targetedCart) {
            cartsRes.push(action.cart);
        } else {
            cartsRes[targetedCartIndex].quantity += 1;
        }
        return {
            ...state,
            carts: cartsRes
        }
    default:
      return state;
  }
};

export default cartReducer;

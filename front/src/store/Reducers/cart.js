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
    case ActionTypes.INCREASE_CART_QUANTITY_BY_ONE:
      let allCarts = [...state.carts];
      const targetedItemIndex = allCarts.findIndex(
        cart => cart._id === action.id
      );
      allCarts[targetedItemIndex].quantity += 1;
      return {
        ...state,
        carts: allCarts,
        totalPrice:
          state.totalPrice + allCarts[targetedItemIndex].mobileId.price
      };
    case ActionTypes.DECREASE_CART_QUANTITY_BY_ONE:
      let allCartss = [...state.carts];
      const targetedItemIndexx = allCartss.findIndex(
        cart => cart._id === action.id
      );
      let targetedItemPrice = 0;
      targetedItemPrice = allCartss[targetedItemIndexx].mobileId.price;
      allCartss[targetedItemIndexx].quantity -= 1;
      if (allCartss[targetedItemIndexx].quantity === 0) {
        allCartss.splice(targetedItemIndexx, 1);
      }
      return {
        ...state,
        carts: allCartss,
        totalPrice: state.totalPrice - targetedItemPrice
      };
    case ActionTypes.ADD_TO_CART:
      const targetedCart = state.carts.find(
        p => p.mobileId._id === action.cart.mobileId._id
      );
      const targetedCartIndex = state.carts.findIndex(
        p => p.mobileId._id === action.cart.mobileId._id
      );
      let cartsRes = [...state.carts];
      if (!targetedCart) {
        cartsRes.push(action.cart);
      } else {
        cartsRes[targetedCartIndex].quantity += 1;
      }
      return {
        ...state,
        carts: cartsRes
      };
    case ActionTypes.REMOVE_ITEM_FROM_CART:
      const allCartsData = [...state.carts];
      const targetCart = allCartsData.find(p => p._id === action.cartId);
      const targetCartIndex = allCartsData.findIndex(
        p => p._id === action.cartId
      );
      let priceBeforeRemove =
        state.totalPrice - targetCart.quantity * targetCart.mobileId.price;
      console.log("beforeee => ", allCartsData);
      allCartsData.splice(targetCartIndex, 1);
      console.log("after => ", allCartsData);
      return {
        ...state,
        carts: allCartsData,
        totalPrice: priceBeforeRemove
      };
    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        carts: [],
        totalPrice: 0
      };
    case ActionTypes.ADD_ORDER:
      return {
        ...state,
        carts: [],
        totalPrice: 0
      };
    case ActionTypes.INCREMENT_CART_ERROR:
      let allTheCarts = [...state.carts];
      const targetedItemm = allTheCarts.find(p => p._id === action.cartid);
      const targetedItemmIndex = allTheCarts.findIndex(
        p => p._id === action.cartid
      );
      console.log(targetedItemm);
      targetedItemm.quantity -= 1;
      let thePrice = 0;
      thePrice = state.totalPrice - targetedItemm.mobileId.price;
      allTheCarts[targetedItemmIndex] = targetedItemm;
      return {
        ...state,
        carts: allTheCarts,
        totalPrice: thePrice
      };
    case ActionTypes.DECREMENT_CART_ERROR:
      let allTheCartss = [...state.carts];
      let targetedIteemm = allTheCartss.find(p => p._id === action.cartid);
      let thePricee = 0;
      const targetedIteemmIndex = allTheCartss.findIndex(
        p => p._id === action.cartid
      );
      if (targetedIteemm) {
        targetedIteemm.quantity += 1;
        thePricee = state.totalPrice + targetedIteemm.mobileId.price;
        allTheCartss[targetedIteemmIndex] = targetedIteemm;
      } else {
        targetedIteemm = action.item;
        targetedIteemm.quantity = 1;
        allTheCartss.push(targetedIteemm);
        thePricee = state.totalPrice + targetedIteemm.mobileId.price;
        console.log('all carts', allTheCartss);
      }
      return {
        ...state,
        carts: allTheCartss,
        totalPrice: thePricee
      };
    default:
      return state;
  }
};

export default cartReducer;

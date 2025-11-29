import { ADD_TO_CART, CHECKOUT, CartItem } from "./CartTypes";

type CartState = {
  cart: CartItem[];
};

const initialState: CartState = {
  cart: []
};

export default function cartReducer(state = initialState, action: any): CartState {
  switch (action.type) {
    case ADD_TO_CART:
      const exists = state.cart.find(item => item.id === action.payload.id);
      if (exists) {
        return {
          cart: state.cart.map(item =>
            item.id === exists.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case CHECKOUT:
      return { cart: [] };

    default:
      return state;
  }
}

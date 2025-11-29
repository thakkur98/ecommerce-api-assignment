import { ADD_TO_CART, CHECKOUT, CartItem } from "./CartTypes";

export const addToCart = (product: CartItem) => ({
  type: ADD_TO_CART,
  payload: product
});

export const checkout = () => ({
  type: CHECKOUT
});

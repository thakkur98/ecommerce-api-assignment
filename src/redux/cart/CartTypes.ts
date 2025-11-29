export const ADD_TO_CART = "ADD_TO_CART";
export const CHECKOUT = "CHECKOUT";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

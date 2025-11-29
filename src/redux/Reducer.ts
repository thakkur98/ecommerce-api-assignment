import { combineReducers } from "redux";
import productsReducer from "./products/ProductReducer";
import cartReducer from "./cart/CartReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;

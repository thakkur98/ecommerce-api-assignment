import { all } from "redux-saga/effects";
import productsSaga from "./products/ProductSaga";
import cartSaga from "./cart/CartSaga";

export default function* rootSaga() {
  yield all([productsSaga(), cartSaga()]);
}

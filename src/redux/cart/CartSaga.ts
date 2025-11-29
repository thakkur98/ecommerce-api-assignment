import { takeLatest, put, select } from "redux-saga/effects";
import { CHECKOUT } from "./CartTypes";

function* checkoutSaga(): any {
  const state = yield select(); 
  const items = state.cart.cart;

  let total = 0;
  items.forEach((i:any) => (total += i.price * i.quantity));

  alert(`Order Placed! Total: ₹${total}`);

  yield put({ type: CHECKOUT }); 
}

export default function* cartSaga() {
  yield takeLatest(CHECKOUT, checkoutSaga);
}

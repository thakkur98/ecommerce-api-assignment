import { call, put, takeLatest } from "redux-saga/effects";
import { fetchProductsSuccess, fetchProductsError } from "./ProductAction";
import { FETCH_PRODUCTS } from "./ProductTypes";

function fetchAPI() {
  return fetch("https://fakestoreapi.com/products").then(res => res.json());
}

function* fetchProductsSaga(): any {
  try {
    const products = yield call(fetchAPI);
    yield put(fetchProductsSuccess(products));
  } catch (e: any) {
    yield put(fetchProductsError(e.message));
  }
}

export default function* productsSaga() {
  yield takeLatest(FETCH_PRODUCTS, fetchProductsSaga);
}

import { Product, FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from "./ProductTypes";

export const fetchProducts = () => ({ type: FETCH_PRODUCTS });
export const fetchProductsSuccess = (products: Product[]) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});
export const fetchProductsError = (error: string) => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: error
});

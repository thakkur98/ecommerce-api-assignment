import { Product, FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from "./ProductTypes";

type ProductsState = {
  loading: boolean;
  data: Product[];
  error: string | null;
};

const initialState: ProductsState = {
  loading: false,
  data: [],
  error: null
};

export default function productsReducer(state = initialState, action: any): ProductsState {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, loading: true };

    case FETCH_PRODUCTS_SUCCESS:
      return { loading: false, data: action.payload, error: null };

    case FETCH_PRODUCTS_ERROR:
      return { loading: false, data: [], error: action.payload };

    default:
      return state;
  }
}

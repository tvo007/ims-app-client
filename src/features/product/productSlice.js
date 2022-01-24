import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  API_URL,
  HTTP_STATUS,
  DELETE_SKU,
} from '../../app/constants';
import axios from 'axios';

export const selectLoadingStatus = ({product}) => product.loading;
export const selectAddProductStatus = ({product}) => product.addProduct;

export const fetchProducts = createAsyncThunk (
  `products/fetchProducts`,
  async () => {
    const {data} = await axios.get (`${API_URL}/api/products`);
    return data;
  }
);

export const addProduct = createAsyncThunk (
  `product/addProduct`,
  async formData => {
    const {data} = await axios.post (
      `${API_URL}/api/products/create`,
      formData
    );
    return data;
  }
);

//todo: to do redone to use with new backend
// export const deleteProduct = createAsyncThunk (
//   `product/deleteProduct`,
//   async formData => {
//     const {data} = await axios.post (`${API_URL}/api/v1/products`, formData, {
//       withCredentials: true,
//     });
//     return data;
//   }
// );

// export const logout = createAsyncThunk (
//   `auth/logout`,
//   async () => {
//     const {data} = await axios.get (`${API_URL}/api/v1/auth/google/logout`, {
//       withCredentials: true,
//     });

//     return data;
//   }
// );

const initialState = {
  loading: false,
  addProduct: false,
  products: [], //parallel to loading
  product: {},
  error: null,
};

const productSlice = createSlice ({
  name: 'product',
  initialState,
  reducers: {
    resetAddProductStatus: (state) => {
      state.addProduct = false;
    },
  },
  extraReducers: {
    [fetchProducts.pending] (state) {
      state.loading = HTTP_STATUS.PENDING;
      state.error = null;
    },
    [fetchProducts.fulfilled] (state, {payload}) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.error = null;
      state.products = payload;
    },
    [fetchProducts.rejected] (state, {error}) {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = error;
    },
    // [fetchProjectBySlug.pending] (state) {
    //   state.loading = HTTP_STATUS.PENDING;
    // },
    // [fetchProjectBySlug.fulfilled] (state, {payload}) {
    //   state.loading = HTTP_STATUS.FULFILLED;
    //   state.project = payload;
    // },
    // [fetchProjectBySlug.rejected] (state) {
    //   state.loading = HTTP_STATUS.REJECTED;
    // },
    [addProduct.pending] (state) {
      state.addProduct = ADD_PRODUCT.PENDING;
    },
    [addProduct.fulfilled] (state, {payload}) {
      state.addProduct = ADD_PRODUCT.FULFILLED;
      state.products.unshift (payload);
    },
    [addProduct.rejected] (state) {
      state.addProduct = ADD_PRODUCT.REJECTED;
    },
    // [deleteProduct.pending] (state) {
    //   state.loading = DELETE_PRODUCT.PENDING;
    // },
    // [deleteProduct.fulfilled] (state, {payload}) {
    //   state.loading = DELETE_PRODUCT.FULFILLED;
    //   state.projects.unshift (payload);
    // },
    // [deleteProduct.rejected] (state) {
    //   state.loading = DELETE_PRODUCT.REJECTED;
    // },
  },
});

export const {resetAddProductStatus} = productSlice.actions;
export default productSlice.reducer;

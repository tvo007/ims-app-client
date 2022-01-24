import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {ADD_SKU, DELETE_SKU, API_URL, HTTP_STATUS} from '../../app/constants';
import axios from 'axios';

export const selectLoadingStatus = ({sku}) => sku.loading;
export const selectAddProjectStatus = ({sku}) => sku.addSku;

export const fetchSkus = createAsyncThunk (`sku/fetchSkus`, async () => {
  const {data} = await axios.get (`${API_URL}/api/skus`);
  return data;
});

export const addSku = createAsyncThunk (`sku/addSku`, async formData => {
  const {data} = await axios.post (`${API_URL}/api/v1/skus`, formData, {
    withCredentials: true,
  });
  return data;
});

export const deleteSku = createAsyncThunk (`sku/deleteSku`, async formData => {
  const {data} = await axios.post (`${API_URL}/api/v1/skus`, formData, {
    withCredentials: true,
  });
  return data;
});

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
  skus: [], //parallel to loading
  sku: {},
};

const skuSlice = createSlice ({
  name: 'sku',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSkus.pending] (state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchSkus.fulfilled] (state, {payload}) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.skus = payload;
    },
    [fetchSkus.rejected] (state) {
      state.loading = HTTP_STATUS.REJECTED;
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
    [addSku.pending] (state) {
      state.loading = ADD_SKU.PENDING;
    },
    [addSku.fulfilled] (state, {payload}) {
      state.loading = ADD_SKU.FULFILLED;
      state.projects.unshift (payload);
    },
    [addSku.rejected] (state) {
      state.loading = ADD_SKU.REJECTED;
    },
    [deleteSku.pending] (state) {
      state.loading = DELETE_SKU.PENDING;
    },
    [deleteSku.fulfilled] (state, {payload}) {
      state.loading = DELETE_SKU.FULFILLED;
      state.projects.unshift (payload);
    },
    [deleteSku.rejected] (state) {
      state.loading = DELETE_SKU.REJECTED;
    },
  },
});

// export const {setIsAuthenticated, setAuthUser} = authSlice.actions;
export default skuSlice.reducer;

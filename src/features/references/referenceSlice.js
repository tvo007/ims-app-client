import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API_URL, HTTP_STATUS} from '../../app/constants';
import axios from 'axios';

export const selectLoadingStatus = ({reference}) => reference.loading;

export const fetchReferences = createAsyncThunk (
  `products/fetchReferences`,
  async () => {
    const {data} = await axios.get (`${API_URL}/api/references`);
    return data;
  }
);

const initialState = {
  loading: false,
  references: {},
  error: null,
};

const referenceSlice = createSlice ({
  name: 'reference',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchReferences.pending] (state) {
      state.loading = HTTP_STATUS.PENDING;
      state.error = null;
    },
    [fetchReferences.fulfilled] (state, {payload}) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.error = null;
      state.references = payload;
    },
    [fetchReferences.rejected] (state, {error}) {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = error;
    },
  },
});

export default referenceSlice.reducer;

import {configureStore} from '@reduxjs/toolkit';
import skusReducer from '../features/sku/skuSlice';
import productReducer from '../features/product/productSlice';
import alertReducer from '../features/alert/alertSlice';
import referencesReducer from '../features/references/referenceSlice';

export const store = configureStore ({
  reducer: {
    sku: skusReducer,
    product: productReducer,
    alert: alertReducer,
    reference: referencesReducer,
  },
});

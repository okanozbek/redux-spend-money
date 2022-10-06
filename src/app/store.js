import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/products/productsSlice';

export const store = configureStore({
  reducer: {
    products: productSlice,
  },
});

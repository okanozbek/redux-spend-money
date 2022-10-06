import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}`);
    return res.data;
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    receiptItems: [],
    status: 'idle',
    error: null,
    walletPrice: 100000000000,
    diffPrice: 100000000000,
  },
  reducers: {
    buyProduct: (state, action) => {
      const product = state.items.find((item) => item.id === action.id);
      if (product.count) {
        product.count++;
        state.walletPrice += product.price;
      }
    },
    sellProduct: (state, action) => {
      const product = state.items.find((item) => item.id === action.id);
      if (product.count) {
        product.count--;
        state.walletPrice -= product.price;
      }
    },
    updateCount: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      const count = Number(action.payload.count);

      if (count > product.count) {
        const countDifference = count - product.count;
        product.count = count;
        state.walletPrice = state.walletPrice - countDifference * product.price;
      } else {
        const countDifference = product.count - count;
        product.count = count;
        state.walletPrice = state.walletPrice + countDifference * product.price;
      }
      state.receiptItems = state.items.filter((item) => item.count > 0);
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.status = 'succeeded';
    },
    [fetchProducts.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export const selectItems = (state) => state.products.items;
export const selectWalletPrice = (state) => state.products.walletPrice;
export const selectDiffPrice = (state) => state.products.diffPrice;

export const { buyProduct, sellProduct, updateCount } = productSlice.actions;

export default productSlice.reducer;

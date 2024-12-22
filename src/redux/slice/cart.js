import { createSlice } from '@reduxjs/toolkit';
import { calculateCartTotals } from '../../util/calculate';

const initialState = {
  items: [],
  totalQuantity: 0,
  note: '',
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      const { totalQuantity, totalPrice } = calculateCartTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      const { totalQuantity, totalPrice } = calculateCartTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },

    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      const { totalQuantity, totalPrice } = calculateCartTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },
    updateNote: (state, action) => {
      state.note = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.note = '';
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  updateNote,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export const selectCartItems = (state) => state.cart.items;
export const selectCartNote = (state) => state.cart.note;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalPrice = (state) => state.cart.totalPrice;

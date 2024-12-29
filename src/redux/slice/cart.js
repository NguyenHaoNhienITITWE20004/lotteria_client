import { createSlice } from '@reduxjs/toolkit';
import { calculateCartTotals } from '../../util/calculate';

const initialState = {
  items: [],
  total_quantity: 0,
  note: '',
  total_price: 0,
  discounted_total_price: 0,
  discount_code: '',
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
        state.items.push({
          ...newItem,
          discounted_price: newItem.price,
          discount_value: 0,
          discount_type: '',
          discount_code: '',
          line_price: newItem.price * 1,
          quantity: 1,
        });
      }
      const { totalQuantity, totalPrice } = calculateCartTotals(state.items);
      state.total_quantity = totalQuantity;
      state.discounted_total_price = totalPrice;
      state.total_price = totalPrice;
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      const { totalQuantity, totalPrice } = calculateCartTotals(state.items);
      state.total_quantity = totalQuantity;
      state.total_price = totalPrice;
    },

    updateCart: (state, action) => {
      const { items, discounted_total_price, discount_code } = action.payload;
      state.items = items;
      state.discounted_total_price = discounted_total_price;
      state.discount_code = discount_code;
    },

    updateDiscount: (state, action) => {
      state.discount_code = action.payload.discount_code;
      state.items.map((item) => {
        if (item.price > item.discounted_price) {
          item.discount_type = action.payload.discount_type;
          item.discount_value = action.payload.discount_value;
        }
      });
    },

    removeDiscount: (state) => {
      state.discount_code = '';
      state.discounted_total_price = state.total_price;
      state.items = state.items.map((item) => ({
        ...item,
        discounted_price: item.price,
        discount_value: 0,
        discount_type: '',
      }));
    },

    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      const { totalQuantity, totalPrice } = calculateCartTotals(state.items);
      state.total_quantity = totalQuantity;
      state.total_price = totalPrice;
    },
    updateNote: (state, action) => {
      state.note = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
      state.total_quantity = 0;
      state.total_price = 0;
      state.note = '';
      state.discount = 0;
      state.discount_code = '';
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  updateNote,
  clearCart,
  updateCart,
  applyDiscount,
  removeDiscount,
} = cartSlice.actions;

export default cartSlice.reducer;
export const selectCartItems = (state) => state.cart.items;
export const selectCartNote = (state) => state.cart.note;
export const selectCartTotalQuantity = (state) => state.cart.total_quantity;
export const selectCartTotalPrice = (state) => state.cart.total_price;
export const selectCartDiscountedTotalPrice = (state) =>
  state.cart.discounted_total_price;

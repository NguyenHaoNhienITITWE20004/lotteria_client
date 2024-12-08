import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLogin = true;
    },
    logoutSuccess: (state) => {
      (state.currentUser = null), (state.isLogin = false);
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;

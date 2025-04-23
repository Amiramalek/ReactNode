// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    loginFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;

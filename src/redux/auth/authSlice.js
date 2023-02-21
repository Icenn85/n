import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refresh } from './auth-operations';

export const initialState = {
  user: { email: null, password: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: {
    [register.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [register.rejected](state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    [logIn.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logIn.rejected](state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    [logOut.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [logOut.fulfilled](state) {
      state.user = { email: null, password: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [logOut.rejected](state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    [refresh.pending](state) {
      state.isRefreshing = true;
    },
    [refresh.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    [refresh.rejected](state) {
      state.isRefreshing = false;
    },
  },
});



export const authReducer = authSlice.reducer;

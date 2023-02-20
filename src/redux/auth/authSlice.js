import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
} from './auth-operations';

export const initialState = {
  accessToken: null,
  refreshToken: null,
  sid: null,
  isRegistered: false,
  isLoggedIn: false,
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
    [register.fulfilled](state) {
      state.isRegistered = true;
      state.isLoading = false;
    },
    [register.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },

    [logIn.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [logIn.fulfilled](state, { payload }) {
      state.isRegistered = true;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [logIn.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});


export const authReducer = authSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  logInApi,
  registerApi,
} from '../../services/authApi';

export const logIn = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      const data = await logInApi(user);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      const data = await registerApi(user);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

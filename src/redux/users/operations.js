import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  refreshToken,
  requestLogin,
  requestLogout,
  requestRegister,
  requestResendVerify,
  requestResetPassword,
  requestForgotPassword,
  requestSendVerify,
  setAuthHeader,
  clearAuthHeader,
} from '../../services/userApi.js';

export const userRegister = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const res = await requestRegister(formData);

      setAuthHeader(res.token);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const res = await requestLogin(formData);

      setAuthHeader(res.token);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const tokenRefresh = createAsyncThunk(
  'auth/refresh',
  async (formData, thunkAPI) => {
    try {
      const res = await refreshToken(formData);

      setAuthHeader(res.token);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (formData, thunkAPI) => {
    try {
      await requestLogout(formData);

      clearAuthHeader();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const sendVerify = createAsyncThunk(
  'auth/verify',
  async ({ verificationToken, formData }, thunkAPI) => {
    try {
      const res = await requestSendVerify(verificationToken, formData);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const resendVerify = createAsyncThunk(
  'auth/re-verify',
  async (formData, thunkAPI) => {
    try {
      const res = await requestResendVerify(formData);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (formData, thunkAPI) => {
    try {
      const res = await requestForgotPassword(formData);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async (formData, thunkAPI) => {
    try {
      const res = await requestResetPassword(formData);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

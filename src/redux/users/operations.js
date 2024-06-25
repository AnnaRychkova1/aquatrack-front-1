import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  requestLogin,
  requestLogout,
  requestRegister,
  requestResendVerify,
  // refreshToken,
  // requestResetPassword,
  // requestForgotPassword,
  requestSendVerify,
} from '../../services/userApi.js';

//SignUp
export const userRegister = createAsyncThunk(
  'users/register',
  async (formData, thunkAPI) => {
    try {
      const res = await requestRegister(formData);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//SignIn
export const logIn = createAsyncThunk(
  'users/login',
  async (formData, thunkAPI) => {
    try {
      const res = await requestLogin(formData);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'users/logout',
  async (formData, thunkAPI) => {
    try {
      await requestLogout(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// export const tokenRefresh = createAsyncThunk(
//   'users/refresh',
//   async (formData, thunkAPI) => {
//     try {
//       const res = await refreshToken(formData);
//       return res;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

export const sendVerify = createAsyncThunk(
  'users/verify',
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
  'users/re-verify',
  async (formData, thunkAPI) => {
    try {
      const res = await requestResendVerify(formData);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// export const forgotPassword = createAsyncThunk(
//   'users/forgot-password',
//   async (formData, thunkAPI) => {
//     try {
//       const res = await requestForgotPassword(formData);

//       return res;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

// export const resetPassword = createAsyncThunk(
//   'users/reset-password',
//   async (formData, thunkAPI) => {
//     try {
//       const res = await requestResetPassword(formData);

//       return res;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

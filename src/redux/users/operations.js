import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
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
import Notification from '../../components/Notification/Notification.jsx';

const options = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

//SignUp
export const userRegister = createAsyncThunk(
  'users/register',
  async (formData, thunkAPI) => {
    try {
      const res = await requestRegister(formData);
      toast.success('Registration successful!', options);
      // Notification({ type: 'success', message: 'Registration successful!' });
      return res;
    } catch (err) {
      Notification({ type: 'error', message: err.message });
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
      switch (err.response?.status) {
        case 401:
          Notification({
            type: 'error',
            message: 'Email or password is wrong',
          });
          toast.error('Email or password is wrong', options);

          break;
        case 404:
          Notification({ type: 'error', message: 'User not found' });
          break;
        default:
          Notification({ type: 'error', message: err.message });

          return thunkAPI.rejectWithValue(err.message);
      }
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

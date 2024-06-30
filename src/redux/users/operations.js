import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  requestLogin,
  requestLogout,
  requestRegister,
  requestResendVerify,
  requestSendVerify,
  updateUserProfiles,
  // refreshToken,
  // requestResetPassword,
  // requestForgotPassword,
  // requestSendVerify,
  uploadUserAvatars,
} from '../../services/userApi.js';

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
      // toast.success('Successfully registered. Check your email', {
      //   ...options,
      // });

      return res;
    } catch (err) {
      toast.error(err.message, { ...options });
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
      // toast.success('Successfully login', { ...options });
      return res;
    } catch (err) {
      switch (err.response?.status) {
        case 401:
          toast.error('Email or password is wrong', { ...options });
          break;
        case 404:
          toast.error('User not found', { ...options });
          break;
        default:
          toast.error(err.message, { ...options });

          return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const logOut = createAsyncThunk(
  'users/logout',
  async (token, thunkAPI) => {
    try {
      await requestLogout(token);
      // toast.success('Successfully logout', { ...options });
      return;
    } catch (err) {
      toast.error(err.message, { ...options });
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
      console.log(res);

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

export const uploadUserAvatar = createAsyncThunk(
  'users/avatars',
  async (formData, thunkAPI) => {
    try {
      const response = await uploadUserAvatars(formData); // Replace with your actual API function
      toast.success('Avatar uploaded successfully', { ...options });
      return response;
    } catch (err) {
      toast.error(err.message, { ...options });
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  'users/update',
  async (formData, thunkAPI) => {
    console.log(formData);
    try {
      const response = await updateUserProfiles(formData); // Replace with your actual API function
      toast.success('Avatar uploaded successfully', { ...options });
      return response;
    } catch (err) {
      toast.error(err.message, { ...options });
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

import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  requestLogin,
  requestLogout,
  requestRegister,
  requestCurrentUser,
  requestUpdateUserProfile,
  requestUploadUserAvatars,
  requestForgotPassword,
  requestChangePassword,
  requestGoogleLogin,
  requestResendVerify,
  requestGeneratePassword,
  requestCountUsers,
} from '../../services/userApi.js';

const options = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Count users
export const countUsers = createAsyncThunk(
  'users/count',
  async (_, thunkAPI) => {
    try {
      const res = await requestCountUsers();
      return res;
    } catch (err) {
      toast.error("Can't count people. Try later");
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

// SignUp
export const userRegister = createAsyncThunk(
  'users/register',
  async (formData, thunkAPI) => {
    try {
      const res = await requestRegister(formData);
      toast.success('Successfully registered. Check your email', {
        ...options,
      });
      return res;
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error(
          'This email is already in use. Please check your email or use a different one.',
          {
            ...options,
          }
        );
      }
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// SignIn
export const logIn = createAsyncThunk(
  'users/login',
  async (formData, thunkAPI) => {
    try {
      const res = await requestLogin(formData);
      toast.success('Successfully login', { ...options });
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
          toast.error(err.response, { ...options });
      }
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

// Logout
export const logOut = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  try {
    await requestLogout();
    toast.success('Successfully logout', { ...options });
    return;
  } catch (err) {
    toast.error(err.message, { ...options });
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Current
export const currentUser = createAsyncThunk(
  'users/current',
  async (_, thunkAPI) => {
    try {
      const response = await requestCurrentUser();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Avatar
export const uploadUserAvatar = createAsyncThunk(
  'users/avatars',
  async (formData, thunkAPI) => {
    try {
      const response = await requestUploadUserAvatars(formData);
      toast.success('Avatar uploaded successfully', { ...options });
      return response.avatarURL;
    } catch (err) {
      toast.error(err.message, { ...options });
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Update profile
export const updateUserProfile = createAsyncThunk(
  'users/update',
  async (formData, thunkAPI) => {
    try {
      const response = await requestUpdateUserProfile(formData);
      toast.success('User update successfully', { ...options });
      return response.user;
    } catch (err) {
      toast.error(err.message, { ...options });
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Password forgot
export const forgotPassword = createAsyncThunk(
  '/users/password/forgot-password',
  async (formData, thunkAPI) => {
    try {
      const res = await requestForgotPassword(formData);
      toast.success('Successfully. Check your email', { ...options });
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
          toast.error(err.response, { ...options });
      }
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

// Password custon update
export const changePassword = createAsyncThunk(
  'users/password/update',
  async (userData, thunkAPI) => {
    try {
      const res = await requestChangePassword(userData);
      toast.success('Successfully created your new password', {
        ...options,
      });
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
          toast.error(err.response, { ...options });
      }
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

// Generate Password
export const generatePassword = createAsyncThunk(
  'users/password/generate',
  async (formData, thunkAPI) => {
    try {
      const res = await requestGeneratePassword(formData);
      toast.success('Successfully. Check your email', { ...options });
      return res;
    } catch (err) {
      switch (err.response?.status) {
        case 400:
          toast.error('Email is wrong', { ...options });
          break;
        case 404:
          toast.error('User not found', { ...options });
          break;
        default:
          toast.error(err.response, { ...options });
      }
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Resend Verify
export const resendVerify = createAsyncThunk(
  'users/verify',
  async (formData, thunkAPI) => {
    try {
      const res = await requestResendVerify(formData);
      toast.success('Verification email sent', {
        ...options,
      });
      return res;
    } catch (err) {
      switch (err.response?.status) {
        case 400:
          toast.error('Verification has already been passed', { ...options });
          break;
        case 404:
          toast.error('User not found', { ...options });
          break;
        default:
          toast.error(err.response, { ...options });
      }
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Google login
export const loginGoogle = createAsyncThunk(
  'users/google',
  async (formData, thunkAPI) => {
    try {
      const res = await requestGoogleLogin(formData);
      toast.success('Verification by Google success', {
        ...options,
      });
      return res;
    } catch (err) {
      toast.error(err.response, { ...options });
      return thunkAPI.rejectWithValue(err.response.data.message || err.message);
    }
  }
);

// Refresh Token

// export const tokenRefresh = createAsyncThunk(
//   'users/refresh',
//   async (formData, thunkAPI) => {
//     try {
//       const res = await requestRefreshToken(formData);
//       return res;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

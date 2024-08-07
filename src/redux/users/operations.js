import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  requestLogin,
  requestGoogleLogin,
  requestLogout,
  requestRegister,
  requestSendVerify,
  requestUserInfo,
  updateUserProfiles,
  uploadUserAvatars,
  resetPassword,
  changePassword,
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

const emailWaitOptions = {
  ...options,
  autoClose: false,
};

// SignUp

export const userRegister = createAsyncThunk(
  'users/register',
  async (formData, thunkAPI) => {
    try {
      const res = await requestRegister(formData);
      toast.success('Successfully registered. Check your email', {
        ...emailWaitOptions,
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

//ADDITIONAL loginGoogle

export const loginGoogle = createAsyncThunk(
  'users/loginGoogle',
  async (formData, thunkAPI) => {
    try {
      const res = await requestGoogleLogin(formData);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message || err.message);
    }
  }
);

// Logout

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

// Current

export const getCurrentUser = createAsyncThunk(
  'users/current',

  async (token, thunkAPI) => {
    try {
      const response = await requestUserInfo(token);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Update

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

export const uploadUserAvatar = createAsyncThunk(
  'users/avatars',
  async (formData, thunkAPI) => {
    try {
      const response = await uploadUserAvatars(formData);
      toast.success('Avatar uploaded successfully', { ...options });
      return response.avatarURL;
    } catch (err) {
      toast.error(err.message, { ...options });
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  'users/update',
  async (formData, thunkAPI) => {
    try {
      const response = await updateUserProfiles(formData);
      toast.success('User update successfully', { ...options });
      return response.user;
    } catch (err) {
      toast.error(err.message, { ...options });
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const newPassword = createAsyncThunk(
  '/users/password/custom',
  async (formData, thunkAPI) => {
    try {
      const res = await resetPassword(formData);
      toast.success('Successfully new password', { ...options });
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

export const newPasswordChange = createAsyncThunk(
  'users/password/custom/update',
  async (formData, thunkAPI) => {
    try {
      const res = await changePassword(formData);
      toast.success('Successfully new password', { ...options });
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

// newPasswordChange

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

// export const getCurrentUser = createAsyncThunk(
//   'users/current',

//   // const token = localStorage.getItem('token');
//   // if (!token) {
//   //   return null;
//   // }

//   async thunkAPI => {
//     try {
//       const response = await requestUserInfo();//
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

// export const resendVerify = createAsyncThunk(
//   'users/re-verify',
//   async (formData, thunkAPI) => {
//     try {
//       const res = await requestResendVerify(formData);

//       return res;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

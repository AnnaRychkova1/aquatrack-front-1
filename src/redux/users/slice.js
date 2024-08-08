import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  userRegister,
  logIn,
  loginGoogle,
  logOut,
  uploadUserAvatar,
  updateUserProfile,
  currentUser,
  forgotPassword,
  changePassword,
  resendVerify,
  generatePassword,
  countUsers,
} from './operations.js';

const INITIAL_STATE = {
  user: {
    id: null,
    name: null,
    email: null,
    gender: null,
    weight: 0,
    activeTimeSports: 0,
    waterDrink: 1.8,
    avatarURL: null,
  },
  users: null,
  token: null,
  isSignedIn: false,
  isLoading: false,
  isError: false,
  isCurrent: false,
};

const handlePending = state => {
  state.isLoading = true;
  state.isError = false;
};

const handleRejected = state => {
  state.isLoading = false;
  state.isError = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder => {
    builder

      .addCase(countUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })

      // Register
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user } = action.payload;
        state.user.email = user.email;
        state.isSignedIn = false;
      })

      // Login
      .addCase(logIn.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        if (token) {
          localStorage.setItem('token', token);
          state.user = user;
          state.token = token;
          state.isSignedIn = true;
          state.isLoading = false;
        }
        state.isLoading = false;
      })

      // Google Login
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isSignedIn = true;
      })

      // Current
      .addCase(currentUser.pending, state => {
        state.isCurrent = true;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isCurrent = false;
        state.user = user;
        state.isSignedIn = true;
        state.isLoading = false;
      })
      .addCase(currentUser.rejected, state => {
        state.isLoading = false;
        state.isCurrent = false;
        state.isError = true;
      })

      // Logout
      .addCase(logOut.fulfilled, () => {
        localStorage.removeItem('token');
        return INITIAL_STATE;
      })

      // Avatar
      .addCase(uploadUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.avatarURL = action.payload;
      })

      // Update
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = action.payload;
        state.user = { ...state.user, ...updatedUser };
      })

      // Password-forgot
      .addCase(forgotPassword.fulfilled, state => {
        state.isLoading = false;
        state.isSignedIn = false;
      })

      // Password-change
      .addCase(changePassword.fulfilled, state => {
        state.isLoading = false;
        state.isSignedIn = false;
      })

      // Password-generate
      .addCase(generatePassword.fulfilled, state => {
        state.isLoading = false;
        state.isSignedIn = false;
      })

      // Resend verify
      .addCase(resendVerify.fulfilled, state => {
        state.isLoading = false;
        state.isSignedIn = false;
      })

      .addMatcher(
        isAnyOf(
          userRegister.pending,
          logIn.pending,
          loginGoogle.pending,
          logOut.pending,
          uploadUserAvatar.pending,
          updateUserProfile.pending,
          forgotPassword.pending,
          changePassword.pending,
          resendVerify.pending,
          generatePassword.pending,
          countUsers.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          userRegister.rejected,
          logIn.rejected,
          loginGoogle.rejected,
          logOut.rejected,
          uploadUserAvatar.rejected,
          updateUserProfile.rejected,
          forgotPassword.rejected,
          changePassword.rejected,
          resendVerify.rejected,
          generatePassword.rejected,
          countUsers.rejected
        ),
        handleRejected
      );
  },
});

export const authReducer = authSlice.reducer;

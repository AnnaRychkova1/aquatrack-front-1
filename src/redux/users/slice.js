import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  userRegister,
  logIn,
  loginGoogle,
  logOut,
  uploadUserAvatar,
  updateUserProfile,
  getCurrentUser,
  newPassword,
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
  name: 'user',
  initialState: INITIAL_STATE,
  extraReducers: builder => {
    builder

      // REGISTER
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user } = action.payload;
        state.user.email = user.email;
        state.isSignedIn = false;
      })

      //password-reset
      .addCase(newPassword.fulfilled, (state, action) => {
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


      //LOGIN
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

      // LOGIN WITH GOOGLE
      .addCase(loginGoogle.pending, handlePending)
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isSignedIn = true;
      })
      .addCase(loginGoogle.rejected, handleRejected)

      // CURRENT
      .addCase(getCurrentUser.pending, state => {
        state.isCurrent = true;
        state.isLoading = true;
        state.isError = false;
        // state.isSignedIn = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isCurrent = false;
        state.user = user;
        state.isSignedIn = true;
        state.isLoading = false;
      })
      .addCase(getCurrentUser.rejected, state => {
        state.isLoading = false;
        state.isCurrent = false;
        state.isError = true;
      })

      // LOGOUT
      .addCase(logOut.fulfilled, () => {
        localStorage.removeItem('token');
        return INITIAL_STATE;
      })

      // AVATAR
      .addCase(uploadUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.avatarURL = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = action.payload;
        state.user = { ...state.user, ...updatedUser };
      })
      .addMatcher(
        isAnyOf(
          userRegister.pending,
          logIn.pending,
          logOut.pending,
          uploadUserAvatar.pending,
          updateUserProfile.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          userRegister.rejected,
          logIn.rejected,
          logOut.rejected,
          uploadUserAvatar.rejected,
          updateUserProfile.rejected
        ),
        handleRejected
      );
  },
});

export const authReducer = authSlice.reducer;

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  userRegister,
  logIn,
  logOut,
  uploadUserAvatar,
  // sendVerify,
  updateUserProfile,
  getCurrentUser,
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
    verify: false,
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
        state.isSignedIn = true;
      })

      // // VERIFY EMAIL
      // .addCase(sendVerify.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   const { user, token } = action.payload;
      //   state.user = user;
      //   state.token = token;
      //   state.isSignedIn = true;
      // })

      //LOGIN
      .addCase(logIn.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        if (token) {
          localStorage.setItem('token', token);
          state.user = user;
          state.token = token;
          state.isSignedIn = true;
        }
        state.isLoading = false;
      })

      // CURRENT
      .addCase(getCurrentUser.pending, state => {
        state.isCurrent = true;
        state.isLoading = true;
        state.isError = false;
        // state.isSignedIn = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isCurrent = false; // update
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
      .addCase(uploadUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.avatarURL = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = action.payload;
        state.user = { ...state.user, ...updatedUser };
      })
      .addMatcher(
        isAnyOf(userRegister.pending, logIn.pending, logOut.pending),
        handlePending
      )
      .addMatcher(
        isAnyOf(userRegister.rejected, logIn.rejected, logOut.rejected),
        handleRejected
      );
  },
});

export const authReducer = authSlice.reducer;

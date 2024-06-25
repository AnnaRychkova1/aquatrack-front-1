// import { createSlice } from '@reduxjs/toolkit';
// import { register, logIn, logOut, refreshUser } from './operations';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: {
//       name: null,
//       email: null,
//     },
//     token: null,
//     isLoggedIn: false,
//     isRefreshing: false,
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(register.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isLoggedIn = true;
//       })
//       .addCase(logIn.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isLoggedIn = true;
//       })
//       .addCase(logOut.fulfilled, state => {
//         state.user = { name: null, email: null };
//         state.token = null;
//         state.isLoggedIn = false;
//       })
//       .addCase(refreshUser.pending, state => {
//         state.isRefreshing = true;
//       })
//       .addCase(refreshUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isLoggedIn = true;
//         state.isRefreshing = false;
//       })
//       .addCase(refreshUser.rejected, state => {
//         state.isRefreshing = false;
//       });
//   },
// });

// export const authReducer = authSlice.reducer;

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { register, logIn, tokenRefresh, logOut } from './operations.js';

const INITIAL_STATE = {
  user: {
    email: null,
  },
  token: null,
  isSignedIn: false,
  isLoading: false,
  isError: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder => {
    builder
      // TOKEN REFRESH
      .addCase(tokenRefresh.pending, handlePending)
      .addCase(tokenRefresh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
      })
      .addCase(tokenRefresh.rejected, handleRejected)
      // LOGOUT
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, state => {
        state.isLoading = false;
        state.user = INITIAL_STATE.user;
        state.token = null;
        state.isSignedIn = false;
      })
      .addCase(logOut.rejected, handleRejected)

      // REGISTER
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.token = action.payload.token;
        state.isSignedIn = true;
      })
      //LOGIN
      .addCase(logIn.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isSignedIn = true;
      })
      .addMatcher(isAnyOf(register.pending, logIn.pending), handlePending)
      .addMatcher(isAnyOf(register.rejected, logIn.rejected), handleRejected);
  },
});

export const authReducer = authSlice.reducer;

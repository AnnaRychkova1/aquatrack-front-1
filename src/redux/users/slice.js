import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { userRegister, logIn, logOut } from './operations.js';

const INITIAL_STATE = {
  user: {
    email: null,
  },
  token: null,
  isSignedIn: false,
  isLoading: false,
  isError: false,
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
        state.user = action.payload.user;
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

      // LOGOUT
      .addCase(logOut.fulfilled, () => {
        return INITIAL_STATE;
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

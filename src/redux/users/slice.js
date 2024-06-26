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
        const { user, token } = action.payload || {};
        console.log(user.user);
        if (user.token) {
          localStorage.setItem('token', token);
          state.user = user.user;
          state.token = user.token;
          state.isSignedIn = true;
        }
        state.isLoading = false;
      })

      // LOGOUT
      .addCase(logOut.fulfilled, () => {
        localStorage.removeItem('token');
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

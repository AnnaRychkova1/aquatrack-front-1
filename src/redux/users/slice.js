import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { userRegister, logIn, logOut } from './operations.js';

const INITIAL_STATE = {
  user: {
    activeTimeSports: 0,
    avatarURL: null,
    createdAt: null,
    email: null,
    gender: null,
    name: null,
    password: null,
    tmpToken: null,
    token: null,
    updatedAt: null,
    verificationToken: null,
    verify: false,
    waterDrink: 1.8,
    weight: 0,
    _id: null,
  },

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
        const { user } = action.payload;
        state.user.email = user.email;
        state.isSignedIn = true;
      })
      //LOGIN
      .addCase(logIn.fulfilled, (state, action) => {
        const { user } = action.payload || {};
        if (user.token) {
          localStorage.setItem('token', user.token);
          state.user = user;
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

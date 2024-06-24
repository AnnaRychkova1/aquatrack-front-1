import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import {
//   refreshUser,
//   logIn,
//   logOut,
//   register,
//   updateUser,
// } from './operations.js';

// export const initialState = {
//   userInfo: {
//     email: null,
//     name: null,
//     gender: null,
//     avatar: null,
//     weight: null,
//     sportsActivity: null,
//     waterRate: null,
//   },
//   isLoggedIn: false,
//   isRefreshing: false,
//   error: '',
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: builder =>
//     builder
//       .addCase(register.fulfilled, (state, action) => {
//         //////////////////////////////
//       })
//       .addCase(logIn.fulfilled, (state, action) => {
//         state.isLoggedIn = true;
//         state.isRefreshing = false;
//         state.accessToken = action.payload.accessToken;
//         localStorage.setItem('refreshToken', action.payload.refreshToken);
//         state.userInfo = action.payload.user;
//       })

//       .addCase(logOut.fulfilled, state => {
//         state.isLoggedIn = false;
//         state.accessToken = null;
//         localStorage.setItem('refreshToken', '');
//       })

//       .addCase(refreshUser.pending, (state, action) => {
//         //////////////////////////////
//         // ТУТ МАЄ ВАШ ЛОУДЕР;
//         state.isRefreshing = true;
//       })

//       .addCase(refreshUser.fulfilled, (state, action) => {
//         state.isLoggedIn = true;
//         state.isRefreshing = false;

//         state.accessToken = action.payload.accessToken;
//         localStorage.setItem('refreshToken', action.payload.refreshToken);

//         state.userInfo.email = action.payload.user.email;
//         state.userInfo.name = action.payload.user.name;
//         state.userInfo.gender = action.payload.user.gender;
//         state.userInfo.avatar = action.payload.user.avatarUrl;
//         state.userInfo.weight = action.payload.user.weight;
//         state.userInfo.sportsActivity = action.payload.user.sportsActivity;
//         state.userInfo.waterRate = action.payload.user.waterRate;
//       })

//       .addCase(updateUser.pending, state => {
//         //////////////////////////////
//         // ТУТ МАЄ ВАШ ЛОУДЕР;
//         state.isRefreshing = true;
//       })

//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.error = '';
//         state.isRefreshing = false;

//         state.userInfo.email = action.payload.email;
//         state.userInfo.name = action.payload.name;
//         state.userInfo.gender = action.payload.gender;
//         state.userInfo.avatar = action.payload.avatarUrl;
//         state.userInfo.weight = action.payload.weight;
//         state.userInfo.sportsActivity = action.payload.sportsActivity;
//         state.userInfo.waterRate = action.payload.waterRate;
//       })

//       .addCase(updateUser.rejected, (state, action) => {
//         state.error = action.payload;
//       })

//       .addCase(refreshUser.rejected, state => {}),
// });

// export const {
//   ///////
// } = userSlice.actions;

// export const userReducer = userSlice.reducer;

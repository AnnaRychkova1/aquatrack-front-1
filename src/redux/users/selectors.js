export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectAccessToken = state => state.user.accessToken;

export const selectRefreshToken = state => state.user.refreshT;

export const selectUserError = state => state.user.error;

export const selectUserAvatar = state => state.user.userInfo.avatar;

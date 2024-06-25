// export const selectIsLoggedIn = state => state.auth.isLoggedIn;

// export const selectUser = state => state.auth.user;

// export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectUser = state => state.user;
export const selectIsSignedIn = state => state.isSignedIn;
export const selectIsLoading = state => state.isLoading;
export const selectIsError = state => state.isError;
export const selectToken = state => state.token;
export const selectEmail = state => state.email;
export const selectPassword = state => state.password;
export const selectResetPassword = state => state.resetPassword;

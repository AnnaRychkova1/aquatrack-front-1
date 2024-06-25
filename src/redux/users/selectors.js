export const selectUser = state => state.user.user;
export const selectEmail = state => state.user.user.email;
export const selectToken = state => state.user.token;
export const selectIsSignedIn = state => state.user.isSignedIn;
export const selectIsLoading = state => state.user.isLoading;
export const selectIsError = state => state.user.isError;

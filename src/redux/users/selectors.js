export const selectUser = state => state.user.user;
export const selectWaterId = state => state.user.user.id;
export const selectName = state => state.user.user.name;
export const selectEmail = state => state.user.user.email;
export const selectAvatar = state => state.user.user.avatarURL;
export const selectWaterDrink = state => state.user.user.waterDrink;
export const selectToken = state => state.user.token;
export const selectIsSignedIn = state => state.user.isSignedIn;
export const selectIsLoading = state => state.user.isLoading;
export const selectIsError = state => state.user.isError;

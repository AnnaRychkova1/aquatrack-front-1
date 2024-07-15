import instance, { setToken, clearToken } from './instance';

// SignUp
export const requestRegister = async formData => {
  const { email, password } = formData;
  const newFormData = { email, password };
  const { data } = await instance.post('/users/register', newFormData);
  return data;
};

// SignIn
export const requestLogin = async formData => {
  const { data } = await instance.post('/users/login', formData);
  localStorage.setItem('token', data.token);
  setToken(data.token);
  return data;
};

// SignOut
export const requestLogout = async token => {
  const { data } = await instance.post('/users/logout');
  clearToken(token);
  localStorage.removeItem('token');
  return data;
};

// Verification Email
export const requestSendVerify = async (verificationToken, formData) => {
  const { data } = await instance.get(
    `/users/verify/${verificationToken}`,
    formData
  );
  return data;
};

// Current
export const requestUserInfo = async () => {
  const { data } = await instance.get('/users/current');
  return data;
};

// Update
export const updateUserProfiles = async formData => {
  const { data } = await instance.patch('/users/update', formData);
  return data;
};

// Avatar
export const uploadUserAvatars = async formData => {
  const { data } = await instance.patch('/users/avatars', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Password-reset
export const resetPassword = async formData => {
  const { data } = await instance.post('/users/password/new', formData);
  localStorage.setItem('token', data.token);
  setToken(data.token);
  return data;
};

// export const requestResendVerify = async formData => {
//   const { data } = await instance.post('/users/verify', formData);

//   return data;
// };

// export const refreshToken = async formData => {
//   const { data } = await instance.get('/users/refresh', formData);
// setAuthHeader(data.token);
//   return data;
// };

// export const requestForgotPassword = async formData => {
//   const { data } = await instance.post('/users/forgot-password', formData);

//   return data;
// };

// export const requestResetPassword = async formData => {
//   const { data } = await instance.post('/users/reset-password', formData);

//   return data;
// };

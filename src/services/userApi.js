import instance, { setToken, clearToken } from './instance';

// Count users
export const requestCountUsers = async () => {
  const { data } = await instance.get('/users/count');
  return data;
};

// SignUp
export const requestRegister = async formData => {
  localStorage.removeItem('token');
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
export const requestCurrentUser = async () => {
  const { data } = await instance.get('/users/current');
  return data;
};

// Update
export const requestUpdateUserProfile = async formData => {
  const { data } = await instance.patch('/users/update', formData);
  return data;
};

// Avatar
export const requestUploadUserAvatars = async formData => {
  const { data } = await instance.patch('/users/avatars', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Password-forgot
export const requestForgotPassword = async formData => {
  const { data } = await instance.post('/users/password/forgot', formData);
  return data;
};

// Password-change
export const requestChangePassword = async (userData, token) => {
  setToken(token);
  localStorage.setItem('token', token);
  const { data } = await instance.post('/users/password/update', userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Password-generate
export const requestGeneratePassword = async formData => {
  const { data } = await instance.post('/users/password/generate', formData);
  return data;
};

// Resend verify
export const requestResendVerify = async formData => {
  const { data } = await instance.post('/users/verify', formData);
  return data;
};

// Google
export const requestGoogleLogin = async formData => {
  const { data } = await instance.get('/users/google', {
    params: formData,
  });
  localStorage.setItem('token', data.token);
  setToken(data.token);
  return data;
};

// Refresh Token
// export const requestRefreshToken = async formData => {
//   const { data } = await instance.get('/users/refresh', formData);
// setAuthHeader(data.token);
//   return data;
// };

import instance from './instance';

export const setAuthHeader = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = '';
};

//SignUp
export const requestRegister = async formData => {
  const { data } = await instance.post('/users/register', formData, {
    withCredentials: true, // Дозволити передачу cookies
  });
  setAuthHeader(data.token);
  return data;
};

//SignIn
export const requestLogin = async formData => {
  const { data } = await instance.post('/users/login', formData);
  setAuthHeader(data.token);
  return data;
};

export const requestLogout = async formData => {
  const { data } = await instance.post('/users/logout', formData);
  clearAuthHeader();
  return data;
};

export const requestSendVerify = async (verificationToken, formData) => {
  const { data } = await instance.get(
    `/users/verify/${verificationToken}`,
    formData
  );

  return data;
};

export const requestResendVerify = async formData => {
  const { data } = await instance.post('/users/verify', formData);

  return data;
};

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

// USER

export const requestUserInfo = async () => {
  const { data } = await instance.get('/users/current');

  return data;
};

export const updateUserProfile = async formData => {
  const { data } = await instance.patch('/users/update', formData);

  return data;
};

export const uploadUserAvatar = async formData => {
  const { data } = await instance.patch('/users/avatar', formData);

  return data;
};

import instance from './instance';

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

//SignUp
export const requestRegister = async formData => {
  const { data } = await instance.post('/users/register', formData, {});
  // setToken(data.token);
  return data;
};

//SignIn
export const requestLogin = async formData => {
  const { data } = await instance.post('/users/login', formData);
  // console.log(data.token);
  localStorage.setItem('token', data.token);
  setToken(data.token);
  return data;
};

export const requestLogout = async token => {
  // setToken(token);
  const { data } = await instance.post('/users/logout');
  clearToken(token);
  localStorage.removeItem('token');
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
  const token = localStorage.getItem('token');
  // console.log(token);
  // setToken(token); ???
  const { data } = await instance.get('/users/current', token);
  // console.log(data);
  // console.log(data.token);
  return data;
};

export const updateUserProfiles = async formData => {
  console.log(formData);
  const { data } = await instance.patch('/users/update', formData);
  console.log(data);
  return data;
};

export const uploadUserAvatars = async formData => {
  // console.log(formData);
  const { data } = await instance.patch('/users/avatars', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

import axios from 'axios';
import instance from './instance';

// Utility to add JWT
export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

//AUTH
export const requestRegister = async formData => {
  const { data } = await instance.post('/auth/register', formData);

  return data;
};

export const requestLogin = async formData => {
  const { data } = await instance.post('/auth/login', formData);

  return data;
};

export const refreshToken = async formData => {
  const { data } = await instance.get('/auth/refresh', formData);

  return data;
};

export const requestLogout = async formData => {
  const { data } = await instance.post('/auth/logout', formData);

  return data;
};

export const requestSendVerify = async (verificationToken, formData) => {
  const { data } = await instance.post(
    `/auth/verify/${verificationToken}`,
    formData
  );

  return data;
};

export const requestResendVerify = async formData => {
  const { data } = await instance.post('/auth/verify', formData);

  return data;
};

export const requestForgotPassword = async formData => {
  const { data } = await instance.post('/auth/forgot-password', formData);

  return data;
};

export const requestResetPassword = async formData => {
  const { data } = await instance.post('/auth/reset-password', formData);

  return data;
};

// USER

export const requestUserInfo = async () => {
  const { data } = await instance.get('/users/current');

  return data;
};

export const updateUserProfile = async formData => {
  const { data } = await instance.patch('/users/current', formData);

  return data;
};

export const uploadUserAvatar = async formData => {
  const { data } = await instance.patch('/users/avatar', formData);

  return data;
};

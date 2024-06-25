import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://aquatrack-back-1.onrender.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Використання інтерцептора axios для автоматичного оновлення токену
// доступу (accessToken) при отриманні відповіді з кодом помилки 401 (неавторизовано).

axios.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (
      err.response &&
      err.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken && refreshToken.length > 0) {
        try {
          const res = await axios.post('/users/refresh', { refreshToken });

          setAuthHeader(res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

          return axios(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('refreshToken');
          clearAuthHeader();
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(err);
  }
);
// -------
//----------

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(
        ('/users/signup', credentials)
        // 'https://aquatrack-back-1.onrender.com/users',
        // credentials
      );
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(
        '/users/login',
        // 'https://aquatrack-back-1.onrender.com/users',
        credentials
      );
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    // ('https://aquatrack-back-1.onrender.com/users');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

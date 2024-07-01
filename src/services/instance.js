import axios from 'axios';

// const API_URL = 'https://aquatrack-back-1.onrender.com/api/';
const API_URL = 'http://localhost:3000/api/';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  delete instance.defaults.headers.common.Authorization;
};

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');

    console.log('in instance', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//   response => response,

//   async error => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await axios.get(`${API_URL}/users/refresh`, {
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });
//         localStorage.setItem('token', data.token);

//         originalRequest.headers.Authorization = `Bearer ${data.token}`;
//         return instance(originalRequest);
//       } catch (refreshError) {
//         console.error('Refresh token failed', refreshError);
//         localStorage.removeItem('token');
//         window.location.href = '/signin';
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default instance;

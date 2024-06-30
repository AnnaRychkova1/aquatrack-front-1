import instance from './instance';

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const addWaterDaily = async (formData, token) => {
  setToken(token);
  const response = await instance.post('/water', formData);
  return response.data;
};

export const editWaterRecord = async (id, day) => {
  const { data } = await instance.patch(`/water/${id}`, day);
  return data;
};

export const deleteWaterRecord = async id => {
  const response = await instance.delete(`/water/${id}`);
  console.log(response);
  return response.data;
};

export const requestWaterDaily = async (date, token) => {
  setToken(token);
  const { data } = await instance.get('/water/daily', {
    params: { date },
  });
  return data;
};

export const requestWaterMonthly = async ({ month, year }, token) => {
  setToken(token);
  const { data } = await instance.get('/water/monthly', {
    params: { month, year },
  });
  return data;
};

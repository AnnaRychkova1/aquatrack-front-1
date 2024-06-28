import instance from './instance';

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const addWaterDaily = async (formData, token) => {
  setToken(token);
  console.log('Data is here', formData);
  console.log('I am from:', token);

  const { newData } = await instance.post('/water', formData);
  return newData;
};

export const editWaterRecord = async (id, day) => {
  const { data } = await instance.patch(`/water/${id}`, day);
  return data;
};

export const deleteWaterRecord = async (id, day) => {
  const { data } = await instance.delete(`/water/${id}`, day);
  return data;
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

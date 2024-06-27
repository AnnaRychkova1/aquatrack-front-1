import instance from './instance';

export const addWaterDaily = async day => {
  const { data } = await instance.post('/water', day);
  return data;
};

export const editWaterRecord = async (id, day) => {
  const { data } = await instance.patch(`/water/${id}`, day);
  return data;
};

export const deleteWaterRecord = async (id, day) => {
  const { data } = await instance.delete(`/water/${id}`, day);
  return data;
};

export const requestWaterDaily = async day => {
  console.log(day);
  const { data } = await instance.get('/water/daily', day);
  return data;
};

export const requestWaterMonthly = async day => {
  const { data } = await instance.get('/water/monthly', day);
  return data;
};

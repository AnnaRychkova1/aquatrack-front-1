import instance from './instance';

export const requestWaterMonthly = async day => {
  console.log('I am requestWaterMonthly');
  const { data } = await instance.get('/water/monthly', day);
  console.log(data);
  return data;
};

export const requestWaterDaily = async day => {
  console.log('I am requestWaterDaily');
  const { data } = await instance.get('/water/daily', day);
  console.log(data);
  return data;
};

export const addWaterDaily = async day => {
  console.log('I am addWaterDaily');
  const { data } = await instance.post('/water', day);
  console.log(data);
  return data;
};

export const editWaterRecord = async (id, day) => {
  console.log('I am editWaterRecord');
  const { data } = await instance.patch(`/water/${id}`, day);
  console.log(data);
  return data;
};

export const deleteWaterRecord = async (id, day) => {
  console.log('I am deleteWaterRecord ');
  const { data } = await instance.delete(`/water/${id}`, day);
  console.log(data);
  return data;
};

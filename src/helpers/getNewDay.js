export const getNewDay = date => {
  date.setHours(0, 0, 0, 0);

  return date.getTime();
};

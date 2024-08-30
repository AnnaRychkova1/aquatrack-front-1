import { createSlice } from '@reduxjs/toolkit';

// const getLocalISOString = () => {
//   const localDate = new Date();
//   const timezoneOffset = localDate.getTimezoneOffset() * 60000;
//   const localISOTime = new Date(
//     localDate.getTime() - timezoneOffset
//   ).toISOString();
//   return localISOTime.slice(0, 19);
// };
const getUTCISOString = () => {
  const utcDate = new Date().toISOString();
  return utcDate.slice(0, 19);
};

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    date: getUTCISOString(),
    paginationDate: getUTCISOString(),
  },
  reducers: {
    changeDate(state, action) {
      state.date = action.payload;
    },

    changePaginationDate(state, action) {
      state.paginationDate = action.payload;
    },
  },
});

export const { changeDate, changePaginationDate } = dateSlice.actions;
export const dateReducer = dateSlice.reducer;

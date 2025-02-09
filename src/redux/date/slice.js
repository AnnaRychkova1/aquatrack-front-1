import { createSlice } from '@reduxjs/toolkit';

const getISOString = () => {
  const localDate = new Date();
  const utcDate = new Date(
    localDate.getTime() - localDate.getTimezoneOffset() * 60000
  ).toISOString();
  console.log('slice', utcDate);
  return utcDate;
};

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    date: getISOString(),
    paginationDate: getISOString(),
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

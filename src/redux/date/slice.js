import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    date: new Date().toISOString(),
    paginationDate: new Date().toISOString(),
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

export const { changeDate, changePaginationDate } =
  dateSlice.actions;
export const dateReducer = dateSlice.reducer;

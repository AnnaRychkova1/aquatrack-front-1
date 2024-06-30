import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    date: new Date().toISOString(),
    paginationDate: new Date().toISOString(),
    paginationBtnDisabled: true,
  },
  reducers: {
    changeDate(state, action) {
      state.date = action.payload;
    },

    changePaginationDate(state, action) {
      state.paginationDate = action.payload;
    },
    changePaginationBtnDisabled(state, action) {
      state.paginationBtnDisabled = action.payload;
    },
  },
});

export const { changeDate, changePaginationDate, changePaginationBtnDisabled } =
  dateSlice.actions;
export const dateReducer = dateSlice.reducer;

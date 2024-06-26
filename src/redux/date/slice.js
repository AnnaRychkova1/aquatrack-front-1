import { createSlice } from '@reduxjs/toolkit';

const currentDate = new Date().toISOString();

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    date: currentDate,
    paginationDate: currentDate,
    paginationBtnDisabled: true,
    isLoading: false,
    error: null,
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

export const { changeDate, changePaginationDate, changePaginationBtnDisabled } = dateSlice.actions;
export const dateReducer = dateSlice.reducer;

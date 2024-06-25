import { createSlice } from '@reduxjs/toolkit';

const currentDate = new Date().toISOString();

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    date: currentDate,
    //Svist Petro
    paginationDate: currentDate,
    //Svist Petro
    isLoading: false,
    error: null,
  },
  reducers: {
    changeDate(state, action) {
      state.date = action.payload;
    },
    //Svist Petro
    changePaginationDate(state, action) {
      state.paginationDate = action.payload;
    },
    //Svist Petro
  },
});

export const { changeDate, changePaginationDate } = dateSlice.actions;
export const dateReducer = dateSlice.reducer;

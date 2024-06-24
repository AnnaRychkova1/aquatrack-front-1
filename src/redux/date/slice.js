import { createSlice } from '@reduxjs/toolkit';

const currentDate = new Date().toISOString();

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    date: currentDate,
    isLoading: false,
    error: null,
  },
  reducers: {
    changeDate(state, action) {
      state.date = action.payload;
    },
  },
});

export const { changeDate } = dateSlice.actions;
export const dateReducer = dateSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    date: '',
    userId: '_id',
  },
  reducers: {
    changeFilter: (state, action) => {
      state.date = action.payload;
    },
    updateUser: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { changeFilter, updateUser } = filtersSlice.actions;
export const selectDateFilter = state => state.filters.date;
export const selectUserIdFilter = state => state.filters.userId;
export const filtersReducer = filtersSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const paginstionSlice = createSlice({
  name: 'pagination',
  initialState: {
    paginationBtnDisabled: true,
    viewStatistics: false,
  },
  reducers: {
    changePaginationBtnDisabled(state, action) {
      state.paginationBtnDisabled = action.payload;
    },
    changeViewStatistics(state, action) {
      state.viewStatistics = action.payload;
    },
  },
});

export const { changePaginationBtnDisabled, changeViewStatistics } =
  paginstionSlice.actions;
export const paginationReducer = paginstionSlice.reducer;

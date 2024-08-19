import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
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
  paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;

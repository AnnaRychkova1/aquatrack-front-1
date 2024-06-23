import { createSlice, createSelector } from '@reduxjs/toolkit';
import {
  fetchWaters,
  addWater,
  deleteWater,
  getMonthWater,
} from './operations.js';

const watersSlice = createSlice({
  name: 'waters',
  initialState: {
    date: null,
    totalDayWater: 0,
    items: [],
    monthItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWaters.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaters.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchWaters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.monthItems = action.payload;
      })
      .addCase(getMonthWater.rejected, state => {
        state.error = true;
      });
  },
});

export const wetersReducer = watersSlice.reducer;
export const selectWaters = state => state.waters.items;

export const selectFilteredWaterss = createSelector(
  state => state.waters.items,
  state => state.filters.name,
  (items, name) => {
    const lowercasedFilter = name ? name.toLowerCase() : '';
    return items.filter(water =>
      water.name.toLowerCase().includes(lowercasedFilter)
    );
  }
);

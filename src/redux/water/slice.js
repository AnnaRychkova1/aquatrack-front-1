import { createSlice } from '@reduxjs/toolkit';
import {
  addWater,
  deleteWater,
  updateWater,
  fetchDailyWater,
  fetchMonthlyWater,
} from './operations';

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    totalDay: null,
    items: [],
    monthIReception: [],
    loading: false,
    error: null,
  },
  reducers: {
    changeTotalDay(state, action) {
      state.totalDay = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // fetchDailyWater (щоденна вода)
      .addCase(fetchDailyWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyWater.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDailyWater.rejected, (state, action) => {
        state.items = [];
        state.loading = false;
        state.error = action.payload;
      })

      // fetchMonthlyWater (вода за місяць)
      .addCase(fetchMonthlyWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyWater.fulfilled, (state, action) => {
        state.monthIReception = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMonthlyWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addWater (додати порцію води)
      .addCase(addWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.monthIReception.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteWater (видалити порцію воду)
      .addCase(deleteWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.items = state.items.filter(water => water._id !== action.payload);
        state.monthIReception = state.monthIReception.filter(
          water => water._id !== action.payload
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateWater (обновити порцію воду)
      .addCase(updateWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        const indexItems = state.items.findIndex(
          dayCard => dayCard._id === action.payload._id
        );
        if (indexItems !== -1) {
          state.items[indexItems] = action.payload;
        }
        const indexMonth = state.monthIReception.findIndex(
          cardMonth => cardMonth._id === action.payload._id
        );
        if (indexMonth !== -1) {
          state.monthIReception[indexMonth] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { changeTotalDay } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;

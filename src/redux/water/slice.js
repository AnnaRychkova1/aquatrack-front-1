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
    date: null, // обрана дата
    totalDay: null, // сьгодні всьго води
    items: [], //   порція прийому води
    monthIReception: [], //  місяць прийому води
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // fetchDailyWater (щоденна вода)
      .addCase(fetchDailyWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyWater.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.items = action.payload.items;
        // state.date = action.payload.date;
        // state.totalDay = action.payload.totalDay;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDailyWater.rejected, (state, action) => {
        state.items = [];
        state.date = action.meta.arg;
        state.totalDay = null;
        state.loading = false;
        state.error = action.payload;
      })

      // fetchMonthlyWater (вода за місяць)
      .addCase(fetchMonthlyWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyWater.fulfilled, (state, action) => {
        state.monthIReceptio = action.payload;
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
        state.totalDay = action.payload.totalDay;
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
        state.items = state.items.filter(water => water.id !== action.payload);
        state.totalDay = action.payload.totalDay;
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
        state.items = action.payload;
        state.totalDay = action.payload.totalDay;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const waterReducer = waterSlice.reducer;

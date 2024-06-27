import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addWater = createAsyncThunk(
  'water/addWater',
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://aquatrack-back-1.onrender.com/api/water/',
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (waterId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://aquatrack-back-1.onrender.com/api/water/:id/${waterId}`
      );
      return waterId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  'water/update',
  async ({ _id, amount, time }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://aquatrack-back-1.onrender.com/water/:id/${_id}`,
        { amount, time }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDailyWater = createAsyncThunk(
  'water/fetchDay',
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://aquatrack-back-1.onrender.com/api/water/daily/${date}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMonthlyWater = createAsyncThunk(
  'water/fetchWaters',
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://aquatrack-back-1.onrender.com/api/water/monthly/${date}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWaters = createAsyncThunk(
  'waters/fetchWaters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://aquatrack-back-1.onrender.com/waters'
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addWater = createAsyncThunk(
  'waters/addWater',
  async (water, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://aquatrack-back-1.onrender.com/waters',
        water
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'waters/deleteWater',
  async (waterId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://aquatrack-back-1.onrender.com/waters/${waterId}`
      );
      return waterId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWaters = createAsyncThunk(
  'waters/update',
  async (water, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://aquatrack-back-1.onrender.com/waters',
        water
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDayWater = createAsyncThunk(
  'water/getDayWater',
  async (date, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/water/day/${date}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

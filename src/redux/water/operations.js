import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  requestWaterMonthly,
  requestWaterDaily,
  addWaterDaily,
  editWaterRecord,
  deleteWaterRecord,
} from '../../services/waterApi';

const options = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const addWater = createAsyncThunk(
  'water/addWater',
  async (values, thunkAPI) => {
    try {
      const response = await addWaterDaily(values);
      toast.success('Successfully add', {
        ...options,
      });
      return response.data;
    } catch (error) {
      toast.error(error.message, { ...options });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (waterId, thunkAPI) => {
    try {
      const response = await deleteWaterRecord(waterId);
      toast.success('Successfully delete', {
        ...options,
      });
      return response.data;
    } catch (error) {
      toast.error(error.message, { ...options });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  'water/update',
  async ({ id, day }, thunkAPI) => {
    try {
      const response = await editWaterRecord(id, day);
      toast.success('Successfully edit', {
        ...options,
      });
      return response;
    } catch (error) {
      toast.error(error.message, { ...options });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDailyWater = createAsyncThunk(
  'water/fetchDay',
  async (date, thunkAPI) => {
    try {
      const response = await requestWaterDaily(date);
      return response.data;
    } catch (error) {
      toast.error(error.message, { ...options });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMonthlyWater = createAsyncThunk(
  'water/fetchWaters',
  async (date, thunkAPI) => {
    try {
      const response = await requestWaterMonthly(date);
      return response.data;
    } catch (error) {
      toast.error(error.message, { ...options });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

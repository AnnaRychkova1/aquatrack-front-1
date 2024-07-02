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
  async ({ formData }, thunkAPI) => {
    try {
      const response = await addWaterDaily(formData);
      toast.success('Successfully add', {
        ...options,
      });
      return response;
    } catch (error) {
      toast.error(error.message, { ...options });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  'water/update',
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await editWaterRecord(id, formData);
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

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async ({ id }, thunkAPI) => {
    try {
      const response = await deleteWaterRecord(id);
      toast.success('Successfully delete', {
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
  async ({ date }, thunkAPI) => {
    try {
      const response = await requestWaterDaily(date);
      return response;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMonthlyWater = createAsyncThunk(
  'water/fetchWaters',
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await requestWaterMonthly({ month, year });
      return response;
    } catch (error) {
      toast.error(error.message, { ...options });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

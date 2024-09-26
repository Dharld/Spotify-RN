import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../../../api/services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = createAsyncThunk(
  'auth/login',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const data = await authService.login(email, password);
      await AsyncStorage.setItem('authToken', data.idToken);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const data = await authService.register(email, password);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const resendVerificationEmail = createAsyncThunk(
  'auth/resendVerificationEmail',
  async (_, {rejectWithValue}) => {
    try {
      await authService.resendVerificationEmail();
      return {message: 'Verification email has been resent.'};
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

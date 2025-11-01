import { createAsyncThunk } from '@reduxjs/toolkit';
import { signUpAPI, signInAPI } from "../../apis/authAPI";

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await signUpAPI(email, password);
      return user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Sign up failed'
      );
    }
  }
);

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await signInAPI(email, password);
      return user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Sign in failed'
      );
    }
  }
);
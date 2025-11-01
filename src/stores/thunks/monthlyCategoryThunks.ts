import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllMonthlyCategoriesAPI,
  getMonthlyCategoriesByUserAPI,
  getMonthlyCategoryByMonthAndUserAPI,
  createMonthlyCategoryAPI,
  updateMonthlyCategoryAPI,
  deleteMonthlyCategoryAPI,
} from '../../apis/monthlycategoryAPI';
import { type CreateMonthlyCategoryDTO, type UpdateMonthlyCategoryDTO } from '../../types/monthlycategory.type';

export const fetchAllMonthlyCategoriesThunk = createAsyncThunk(
  'monthlyCategory/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const monthlyCategories = await getAllMonthlyCategoriesAPI();
      return monthlyCategories;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch monthly categories'
      );
    }
  }
);

export const fetchMonthlyCategoriesByUserThunk = createAsyncThunk(
  'monthlyCategory/fetchByUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const monthlyCategories = await getMonthlyCategoriesByUserAPI(userId);
      return monthlyCategories;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch user monthly categories'
      );
    }
  }
);

export const fetchMonthlyCategoryByMonthAndUserThunk = createAsyncThunk(
  'monthlyCategory/fetchByMonthAndUser',
  async ({ userId, month }: { userId: string; month: string }, { rejectWithValue }) => {
    try {
      const monthlyCategory = await getMonthlyCategoryByMonthAndUserAPI(userId, month);
      return monthlyCategory;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch monthly category'
      );
    }
  }
);

export const createMonthlyCategoryThunk = createAsyncThunk(
  'monthlyCategory/create',
  async (categoryData: CreateMonthlyCategoryDTO, { rejectWithValue }) => {
    try {
      const newMonthlyCategory = await createMonthlyCategoryAPI(categoryData);
      return newMonthlyCategory;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to create monthly category'
      );
    }
  }
);

export const updateMonthlyCategoryThunk = createAsyncThunk(
  'monthlyCategory/update',
  async (
    { monthlyCategoryId, categoryData }: { monthlyCategoryId: string; categoryData: UpdateMonthlyCategoryDTO },
    { rejectWithValue }
  ) => {
    try {
      const updatedMonthlyCategory = await updateMonthlyCategoryAPI(monthlyCategoryId, categoryData);
      return updatedMonthlyCategory;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update monthly category'
      );
    }
  }
);

export const deleteMonthlyCategoryThunk = createAsyncThunk(
  'monthlyCategory/delete',
  async (monthlyCategoryId: string, { rejectWithValue }) => {
    try {
      await deleteMonthlyCategoryAPI(monthlyCategoryId);
      return monthlyCategoryId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to delete monthly category'
      );
    }
  }
);
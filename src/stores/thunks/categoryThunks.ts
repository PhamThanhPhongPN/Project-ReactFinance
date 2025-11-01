import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getAllCategoriesAPI, 
  createCategoryAPI,
  updateCategoryAPI, 
  deleteCategoryAPI, 
  toggleCategoryStatusAPI 
} from '../../apis/categoryAPI';
import { type Category, CategoryStatus } from '../../types/category.type';

export const fetchAllCategoriesThunk = createAsyncThunk(
  'categoryManagement/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await getAllCategoriesAPI();
      return categories;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch categories'
      );
    }
  }
);

export const createCategoryThunk = createAsyncThunk(
  'categoryManagement/create',
  async (categoryData: Omit<Category, 'id'>, { rejectWithValue }) => {
    try {
      const newCategory = await createCategoryAPI(categoryData);
      return newCategory;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to create category'
      );
    }
  }
);

export const updateCategoryThunk = createAsyncThunk(
  'categoryManagement/update',
  async (
    { categoryId, categoryData }: { categoryId: string; categoryData: Partial<Category> },
    { rejectWithValue }
  ) => {
    try {
      const updatedCategory = await updateCategoryAPI(categoryId, categoryData);
      return updatedCategory;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update category'
      );
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  'categoryManagement/delete',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      await deleteCategoryAPI(categoryId);
      return categoryId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to delete category'
      );
    }
  }
);

export const toggleCategoryStatusThunk = createAsyncThunk(
  'categoryManagement/toggleStatus',
  async (
    { categoryId, currentStatus }: { categoryId: string; currentStatus: CategoryStatus },
    { rejectWithValue }
  ) => {
    try {
      const updatedCategory = await toggleCategoryStatusAPI(categoryId, currentStatus);
      return updatedCategory;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to toggle status'
      );
    }
  }
);
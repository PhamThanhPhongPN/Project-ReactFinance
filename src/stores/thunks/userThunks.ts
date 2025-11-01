import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getAllUsersAPI, 
  updateUserAPI, 
  deleteUserAPI, 
  toggleUserStatusAPI 
} from '../../apis/userAPI';
import { type User, UserStatus } from '../../types/user.type';

export const fetchAllUsersThunk = createAsyncThunk(
  'userManagement/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const users = await getAllUsersAPI();
      return users;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch users'
      );
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'userManagement/update',
  async (
    { userId, userData }: { userId: string; userData: Partial<User> },
    { rejectWithValue }
  ) => {
    try {
      const updatedUser = await updateUserAPI(userId, userData);
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update user'
      );
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  'userManagement/delete',
  async (userId: string, { rejectWithValue }) => {
    try {
      await deleteUserAPI(userId);
      return userId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to delete user'
      );
    }
  }
);

export const toggleUserStatusThunk = createAsyncThunk(
  'userManagement/toggleStatus',
  async (
    { userId, currentStatus }: { userId: string; currentStatus: UserStatus },
    { rejectWithValue }
  ) => {
    try {
      const updatedUser = await toggleUserStatusAPI(userId, currentStatus);
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to toggle status'
      );
    }
  }
);
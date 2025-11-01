import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user.type';
import { 
  fetchAllUsersThunk, 
  updateUserThunk, 
  deleteUserThunk, 
  toggleUserStatusThunk 
} from "../thunks/userThunks";

interface UserManagementState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  selectedUser: User | null;
}

const initialState: UserManagementState = {
  users: [],
  isLoading: false,
  error: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllUsersThunk.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchAllUsersThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      state.selectedUser = null;
    });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.users = state.users.filter(u => u.id !== action.payload);
    });
    builder.addCase(deleteUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(toggleUserStatusThunk.pending, (state) => {
      state.error = null;
    });
    builder.addCase(toggleUserStatusThunk.fulfilled, (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
    builder.addCase(toggleUserStatusThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { clearError, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
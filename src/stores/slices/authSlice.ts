import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user.type';
import { signUpThunk, signInThunk } from "../thunks/authThunk";
import { updateUserThunk } from '../thunks/userThunks';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    loadUserFromStorage: (state) => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        state.user = JSON.parse(storedUser);
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUpThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(signInThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signInThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    });
    builder.addCase(signInThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
      if (state.user && state.user.id === action.payload.id) {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    });
  },
});

export const { logout, clearError, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
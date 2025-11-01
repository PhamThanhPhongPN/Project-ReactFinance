import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../../types/category.type';
import { 
  fetchAllCategoriesThunk, 
  createCategoryThunk,
  updateCategoryThunk, 
  deleteCategoryThunk, 
  toggleCategoryStatusThunk 
} from "../thunks/categoryThunks";

interface CategoryManagementState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: Category | null;
}

const initialState: CategoryManagementState = {
  categories: [],
  isLoading: false,
  error: null,
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: 'categoryManagement',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategoriesThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCategoriesThunk.fulfilled, (state, action: PayloadAction<Category[]>) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchAllCategoriesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createCategoryThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createCategoryThunk.fulfilled, (state, action: PayloadAction<Category>) => {
      state.isLoading = false;
      state.categories.push(action.payload);
    });
    builder.addCase(createCategoryThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateCategoryThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateCategoryThunk.fulfilled, (state, action: PayloadAction<Category>) => {
      state.isLoading = false;
      const index = state.categories.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
      state.selectedCategory = null;
    });
    builder.addCase(updateCategoryThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteCategoryThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteCategoryThunk.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.categories = state.categories.filter(c => c.id !== action.payload);
    });
    builder.addCase(deleteCategoryThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(toggleCategoryStatusThunk.pending, (state) => {
      state.error = null;
    });
    builder.addCase(toggleCategoryStatusThunk.fulfilled, (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    });
    builder.addCase(toggleCategoryStatusThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { clearError, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
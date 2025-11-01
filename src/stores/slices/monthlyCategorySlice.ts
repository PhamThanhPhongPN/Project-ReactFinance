import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type MonthlyCategory } from '../../types/monthlycategory.type';
import {
  fetchAllMonthlyCategoriesThunk,
  fetchMonthlyCategoriesByUserThunk,
  fetchMonthlyCategoryByMonthAndUserThunk,
  createMonthlyCategoryThunk,
  updateMonthlyCategoryThunk,
  deleteMonthlyCategoryThunk,
} from '../thunks/monthlyCategoryThunks';

interface MonthlyCategoryState {
  monthlyCategories: MonthlyCategory[];
  currentMonthlyCategory: MonthlyCategory | null;
  selectedMonth: string; // Format: "2025-11-30"
  isLoading: boolean;
  error: string | null;
}

const initialState: MonthlyCategoryState = {
  monthlyCategories: [],
  currentMonthlyCategory: null,
  selectedMonth: new Date().toISOString().slice(0, 7) + '-30', // Default to current month
  isLoading: false,
  error: null,
};

const monthlyCategorySlice = createSlice({
  name: 'monthlyCategory',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedMonth: (state, action: PayloadAction<string>) => {
      state.selectedMonth = action.payload;
    },
    setCurrentMonthlyCategory: (state, action: PayloadAction<MonthlyCategory | null>) => {
      state.currentMonthlyCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all monthly categories
    builder.addCase(fetchAllMonthlyCategoriesThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllMonthlyCategoriesThunk.fulfilled, (state, action: PayloadAction<MonthlyCategory[]>) => {
      state.isLoading = false;
      state.monthlyCategories = action.payload;
    });
    builder.addCase(fetchAllMonthlyCategoriesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch by user
    builder.addCase(fetchMonthlyCategoriesByUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMonthlyCategoriesByUserThunk.fulfilled, (state, action: PayloadAction<MonthlyCategory[]>) => {
      state.isLoading = false;
      state.monthlyCategories = action.payload;
    });
    builder.addCase(fetchMonthlyCategoriesByUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch by month and user
    builder.addCase(fetchMonthlyCategoryByMonthAndUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMonthlyCategoryByMonthAndUserThunk.fulfilled, (state, action: PayloadAction<MonthlyCategory | null>) => {
      state.isLoading = false;
      state.currentMonthlyCategory = action.payload;
    });
    builder.addCase(fetchMonthlyCategoryByMonthAndUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Create
    builder.addCase(createMonthlyCategoryThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createMonthlyCategoryThunk.fulfilled, (state, action: PayloadAction<MonthlyCategory>) => {
      state.isLoading = false;
      state.monthlyCategories.push(action.payload);
      state.currentMonthlyCategory = action.payload;
    });
    builder.addCase(createMonthlyCategoryThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Update
    builder.addCase(updateMonthlyCategoryThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateMonthlyCategoryThunk.fulfilled, (state, action: PayloadAction<MonthlyCategory>) => {
      state.isLoading = false;
      const index = state.monthlyCategories.findIndex(mc => mc.id === action.payload.id);
      if (index !== -1) {
        state.monthlyCategories[index] = action.payload;
      }
      if (state.currentMonthlyCategory?.id === action.payload.id) {
        state.currentMonthlyCategory = action.payload;
      }
    });
    builder.addCase(updateMonthlyCategoryThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Delete
    builder.addCase(deleteMonthlyCategoryThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteMonthlyCategoryThunk.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.monthlyCategories = state.monthlyCategories.filter(mc => mc.id !== action.payload);
      if (state.currentMonthlyCategory?.id === action.payload) {
        state.currentMonthlyCategory = null;
      }
    });
    builder.addCase(deleteMonthlyCategoryThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, setSelectedMonth, setCurrentMonthlyCategory } = monthlyCategorySlice.actions;
export default monthlyCategorySlice.reducer;
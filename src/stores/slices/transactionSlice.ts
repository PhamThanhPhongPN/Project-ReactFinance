import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Transaction } from '../../types/transaction.type';
import {
  fetchAllTransactionsThunk,
  fetchTransactionsByUserThunk,
  fetchTransactionsByMonthlyBudgetThunk,
  createTransactionThunk,
  updateTransactionThunk,
  deleteTransactionThunk,
} from '../thunks/transactionThunks';

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  selectedTransaction: Transaction | null;
}

const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
  error: null,
  selectedTransaction: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedTransaction: (state, action: PayloadAction<Transaction | null>) => {
      state.selectedTransaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchAllTransactionsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllTransactionsThunk.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
      state.isLoading = false;
      state.transactions = action.payload;
    });
    builder.addCase(fetchAllTransactionsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch by user
    builder.addCase(fetchTransactionsByUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactionsByUserThunk.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
      state.isLoading = false;
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactionsByUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch by monthly budget
    builder.addCase(fetchTransactionsByMonthlyBudgetThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactionsByMonthlyBudgetThunk.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
      state.isLoading = false;
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactionsByMonthlyBudgetThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Create
    builder.addCase(createTransactionThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createTransactionThunk.fulfilled, (state, action: PayloadAction<Transaction>) => {
      state.isLoading = false;
      state.transactions.push(action.payload);
    });
    builder.addCase(createTransactionThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Update
    builder.addCase(updateTransactionThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateTransactionThunk.fulfilled, (state, action: PayloadAction<Transaction>) => {
      state.isLoading = false;
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
      state.selectedTransaction = null;
    });
    builder.addCase(updateTransactionThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Delete
    builder.addCase(deleteTransactionThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteTransactionThunk.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    });
    builder.addCase(deleteTransactionThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, setSelectedTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
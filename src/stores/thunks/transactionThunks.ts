import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllTransactionsAPI,
  getTransactionsByUserAPI,
  getTransactionsByMonthlyBudgetAPI,
  createTransactionAPI,
  updateTransactionAPI,
  deleteTransactionAPI,
} from '../../apis/transactionAPI';
import { type CreateTransactionDTO, type Transaction } from '../../types/transaction.type';

export const fetchAllTransactionsThunk = createAsyncThunk(
  'transaction/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const transactions = await getAllTransactionsAPI();
      return transactions;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch transactions'
      );
    }
  }
);

export const fetchTransactionsByUserThunk = createAsyncThunk(
  'transaction/fetchByUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const transactions = await getTransactionsByUserAPI(userId);
      return transactions;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch user transactions'
      );
    }
  }
);

export const fetchTransactionsByMonthlyBudgetThunk = createAsyncThunk(
  'transaction/fetchByMonthlyBudget',
  async (monthlyBudgetId: string, { rejectWithValue }) => {
    try {
      const transactions = await getTransactionsByMonthlyBudgetAPI(monthlyBudgetId);
      return transactions;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch monthly transactions'
      );
    }
  }
);

export const createTransactionThunk = createAsyncThunk(
  'transaction/create',
  async (transactionData: CreateTransactionDTO, { rejectWithValue }) => {
    try {
      const newTransaction = await createTransactionAPI(transactionData);
      return newTransaction;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to create transaction'
      );
    }
  }
);

export const updateTransactionThunk = createAsyncThunk(
  'transaction/update',
  async (
    { transactionId, transactionData }: { transactionId: string; transactionData: Partial<Transaction> },
    { rejectWithValue }
  ) => {
    try {
      const updatedTransaction = await updateTransactionAPI(transactionId, transactionData);
      return updatedTransaction;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update transaction'
      );
    }
  }
);

export const deleteTransactionThunk = createAsyncThunk(
  'transaction/delete',
  async (transactionId: string, { rejectWithValue }) => {
    try {
      await deleteTransactionAPI(transactionId);
      return transactionId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to delete transaction'
      );
    }
  }
);
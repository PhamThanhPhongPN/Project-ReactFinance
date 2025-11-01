import axiosInstance from './index';
import { type Transaction, type CreateTransactionDTO } from '../types/transaction.type';

interface TransactionResponse {
  id: number;
  createDate: string;
  total: number;
  description: string;
  categoryId: number;
  monthlyCategories: number;
  userId: number;
}

const convertToTransaction = (response: TransactionResponse): Transaction => {
  return {
    id: response.id.toString(),
    createDate: response.createDate,
    total: response.total,
    description: response.description,
    categoryId: response.categoryId.toString(),
    monthlyCategories: response.monthlyCategories.toString(),
    userId: response.userId.toString(),
  };
};

export const getAllTransactionsAPI = async () => {
  const response = await axiosInstance.get<TransactionResponse[]>('/transactions');
  return response.data.map(convertToTransaction);
};

export const getTransactionsByUserAPI = async (userId: string) => {
  const response = await axiosInstance.get<TransactionResponse[]>(`/transactions?userId=${userId}`);
  return response.data.map(convertToTransaction);
};

export const getTransactionsByMonthlyBudgetAPI = async (monthlyBudgetId: string) => {
  const response = await axiosInstance.get<TransactionResponse[]>(`/transactions?monthlyCategories=${monthlyBudgetId}`);
  return response.data.map(convertToTransaction);
};

export const getTransactionByIdAPI = async (transactionId: string) => {
  const response = await axiosInstance.get<TransactionResponse>(`/transactions/${transactionId}`);
  return convertToTransaction(response.data);
};

export const createTransactionAPI = async (transactionData: CreateTransactionDTO) => {
  const createData = {
    createDate: transactionData.createDate,
    total: transactionData.total,
    description: transactionData.description,
    categoryId: parseInt(transactionData.categoryId),
    monthlyCategories: parseInt(transactionData.monthlyCategories),
    userId: parseInt(transactionData.userId),
  };
  
  const response = await axiosInstance.post<TransactionResponse>('/transactions', createData);
  return convertToTransaction(response.data);
};

export const updateTransactionAPI = async (transactionId: string, transactionData: Partial<Transaction>) => {
  const updateData: any = { ...transactionData };
  
  if (transactionData.categoryId) {
    updateData.categoryId = parseInt(transactionData.categoryId);
  }
  if (transactionData.monthlyCategories) {
    updateData.monthlyCategories = parseInt(transactionData.monthlyCategories);
  }
  if (transactionData.userId) {
    updateData.userId = parseInt(transactionData.userId);
  }
  
  const response = await axiosInstance.patch<TransactionResponse>(`/transactions/${transactionId}`, updateData);
  return convertToTransaction(response.data);
};

export const deleteTransactionAPI = async (transactionId: string) => {
  await axiosInstance.delete(`/transactions/${transactionId}`);
  return transactionId;
};
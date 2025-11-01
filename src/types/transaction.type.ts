export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE"
}

export interface Transaction {
  id: string;
  createDate: string; 
  total: number;
  description: string;
  categoryId: string;
  monthlyCategories: string; 
  userId: string;
}

export interface CreateTransactionDTO {
  createDate: string;
  total: number;
  description: string;
  categoryId: string;
  monthlyCategories: string;
  userId: string;
}
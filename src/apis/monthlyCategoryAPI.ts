import axiosInstance from './index';
import { type MonthlyCategory, type CreateMonthlyCategoryDTO, type UpdateMonthlyCategoryDTO, type CategoryBudget } from '../types/monthlycategory.type';

interface CategoryBudgetResponse {
  id: number;
  categoryId: number;
  budget: number;
}

interface MonthlyCategoryResponse {
  id: number;
  month: string;
  balance: number;
  userId: number;
  categories: CategoryBudgetResponse[];
}

const convertToCategoryBudget = (response: CategoryBudgetResponse): CategoryBudget => {
  return {
    id: response.id?.toString() || '',
    categoryId: response.categoryId?.toString() || '',
    budget: response.budget || 0,
  };
};

const convertToMonthlyCategory = (response: MonthlyCategoryResponse): MonthlyCategory => {
  return {
    id: response.id?.toString() || '',
    month: response.month || '',
    balance: response.balance || 0,
    userId: response.userId?.toString() || '',
    categories: Array.isArray(response.categories) ? response.categories.map(convertToCategoryBudget) : [],
  };
};

export const getAllMonthlyCategoriesAPI = async () => {
  const response = await axiosInstance.get<MonthlyCategoryResponse[]>('/monthlyCategories');
  return response.data.map(convertToMonthlyCategory);
};

export const getMonthlyCategoriesByUserAPI = async (userId: string) => {
  const response = await axiosInstance.get<MonthlyCategoryResponse[]>(`/monthlyCategories?userId=${userId}`);
  return response.data.map(convertToMonthlyCategory);
};

export const getMonthlyCategoryByMonthAndUserAPI = async (userId: string, month: string) => {
  const response = await axiosInstance.get<MonthlyCategoryResponse[]>(
    `/monthlyCategories?userId=${userId}&month=${month}`
  );
  
  if (response.data.length > 0) {
    return convertToMonthlyCategory(response.data[0]);
  }
  return null;
};

export const getMonthlyCategoryByIdAPI = async (monthlyCategoryId: string) => {
  const response = await axiosInstance.get<MonthlyCategoryResponse>(`/monthlyCategories/${monthlyCategoryId}`);
  return convertToMonthlyCategory(response.data);
};

export const createMonthlyCategoryAPI = async (categoryData: CreateMonthlyCategoryDTO) => {
  const createData = {
    month: categoryData.month,
    balance: categoryData.balance,
    userId: parseInt(categoryData.userId),
    categories: categoryData.categories.map(cat => ({
      id: Math.floor(Math.random() * 1000000), // Generate temporary ID
      categoryId: parseInt(cat.categoryId),
      budget: cat.budget,
    })),
  };
  
  const response = await axiosInstance.post<MonthlyCategoryResponse>('/monthlyCategories', createData);
  return convertToMonthlyCategory(response.data);
};

export const updateMonthlyCategoryAPI = async (monthlyCategoryId: string, categoryData: UpdateMonthlyCategoryDTO) => {
  const updateData: any = {};
  
  if (categoryData.balance !== undefined) {
    updateData.balance = categoryData.balance;
  }
  
  if (categoryData.categories) {
    updateData.categories = categoryData.categories.map(cat => ({
      id: parseInt(cat.id),
      categoryId: parseInt(cat.categoryId),
      budget: cat.budget,
    }));
  }
  
  const response = await axiosInstance.patch<MonthlyCategoryResponse>(`/monthlyCategories/${monthlyCategoryId}`, updateData);
  return convertToMonthlyCategory(response.data);
};

export const deleteMonthlyCategoryAPI = async (monthlyCategoryId: string) => {
  await axiosInstance.delete(`/monthlyCategories/${monthlyCategoryId}`);
  return monthlyCategoryId;
};
export interface CategoryBudget {
  id: string;
  categoryId: string;
  budget: number;
}

export interface MonthlyCategory {
  id: string;
  month: string; 
  balance: number; 
  userId: string;
  categories: CategoryBudget[];
}

export interface CreateMonthlyCategoryDTO {
  month: string;
  balance: number;
  userId: string;
  categories: Omit<CategoryBudget, 'id'>[];
}

export interface UpdateMonthlyCategoryDTO {
  balance?: number;
  categories?: CategoryBudget[];
}
import axiosInstance from './index';
import { type Category, CategoryStatus } from '../types/category.type';

interface CategoryResponse {
  id: number;
  name: string;
  imageUrl: string;
  status: boolean;
}

const convertToCategory = (categoryResponse: CategoryResponse): Category => {
  return {
    id: categoryResponse.id.toString(),
    name: categoryResponse.name,
    imageUrl: categoryResponse.imageUrl,
    status: categoryResponse.status ? CategoryStatus.ACTIVE : CategoryStatus.INACTIVE,
  };
};

export const getAllCategoriesAPI = async () => {
  const response = await axiosInstance.get<CategoryResponse[]>('/categories');
  return response.data.map(convertToCategory);
};

export const getCategoryByIdAPI = async (categoryId: string) => {
  const response = await axiosInstance.get<CategoryResponse>(`/categories/${categoryId}`);
  return convertToCategory(response.data);
};

export const createCategoryAPI = async (categoryData: Omit<Category, 'id'>) => {
  const createData = {
    name: categoryData.name,
    imageUrl: categoryData.imageUrl,
    status: categoryData.status === CategoryStatus.ACTIVE,
  };
  
  const response = await axiosInstance.post<CategoryResponse>('/categories', createData);
  return convertToCategory(response.data);
};

export const updateCategoryAPI = async (categoryId: string, categoryData: Partial<Category>) => {
  const updateData: any = { ...categoryData };
  if (categoryData.status) {
    updateData.status = categoryData.status === CategoryStatus.ACTIVE;
  }
  
  const response = await axiosInstance.patch<CategoryResponse>(`/categories/${categoryId}`, updateData);
  return convertToCategory(response.data);
};

export const deleteCategoryAPI = async (categoryId: string) => {
  await axiosInstance.delete(`/categories/${categoryId}`);
  return categoryId;
};

export const toggleCategoryStatusAPI = async (categoryId: string, currentStatus: CategoryStatus) => {
  const newStatus = currentStatus === CategoryStatus.ACTIVE ? CategoryStatus.INACTIVE : CategoryStatus.ACTIVE;
  const response = await axiosInstance.patch<CategoryResponse>(`/categories/${categoryId}`, {
    status: newStatus === CategoryStatus.ACTIVE
  });
  return convertToCategory(response.data);
};
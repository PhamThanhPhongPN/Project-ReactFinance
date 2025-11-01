import axiosInstance from './index';
import { type User, UserRole, UserStatus } from '../types/user.type';

interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  gender: boolean;
  status: boolean; 
  role: string;
}

const convertToUser = (userResponse: UserResponse): User => {
  return {
    id: userResponse.id.toString(),
    fullName: userResponse.fullName,
    email: userResponse.email,
    password: userResponse.password,
    phone: userResponse.phone,
    gender: userResponse.gender,
    status: userResponse.status ? UserStatus.ACTIVE : UserStatus.DEACTIVATE,
    role: userResponse.role as UserRole,
  };
};

export const getAllUsersAPI = async () => {
  const response = await axiosInstance.get<UserResponse[]>('/users');
  return response.data.map(convertToUser);
};

export const getUserByIdAPI = async (userId: string) => {
  const response = await axiosInstance.get<UserResponse>(`/users/${userId}`);
  return convertToUser(response.data);
};

export const updateUserAPI = async (userId: string, userData: Partial<User>) => {
  const updateData: any = { ...userData };
  if (userData.status) {
    updateData.status = userData.status === UserStatus.ACTIVE;
  }
  
  const response = await axiosInstance.patch<UserResponse>(`/users/${userId}`, updateData);
  return convertToUser(response.data);
};

export const deleteUserAPI = async (userId: string) => {
  await axiosInstance.delete(`/users/${userId}`);
  return userId;
};

export const toggleUserStatusAPI = async (userId: string, currentStatus: UserStatus) => {
  const newStatus = currentStatus === UserStatus.ACTIVE ? UserStatus.DEACTIVATE : UserStatus.ACTIVE;
  const response = await axiosInstance.patch<UserResponse>(`/users/${userId}`, {
    status: newStatus === UserStatus.ACTIVE
  });
  return convertToUser(response.data);
};
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

export const signUpAPI = async (email: string, password: string) => {
  const newUser = {
    fullName: "New User", 
    email,
    password,
    phone: "", 
    gender: true,
    status: true, 
    role: "USER", 
  };

  const response = await axiosInstance.post<UserResponse>('/users', newUser);
  return convertToUser(response.data);
};

export const signInAPI = async (email: string, password: string) => {
  const response = await axiosInstance.get<UserResponse[]>(`/users?email=${email}`);
  
  if (response.data.length === 0) {
    throw new Error('User not found');
  }

  const user = response.data[0];

  if (user.password !== password) {
    throw new Error('Invalid password');
  }

  return convertToUser(user);
};

export const getUserByIdAPI = async (userId: string) => {
  const response = await axiosInstance.get<UserResponse>(`/users/${userId}`);
  return convertToUser(response.data);
};

export const updateUserAPI = async (userId: string, userData: Partial<User>) => {
  const response = await axiosInstance.patch<UserResponse>(`/users/${userId}`, userData);
  return convertToUser(response.data);
};
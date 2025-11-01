import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../stores/slices/authSlice';
import userReducer from '../stores/slices/userSlice';
import categoryReducer from '../stores/slices/categorySlice';
import monthlyCategoryReducer from '../stores/slices/monthlyCategorySlice';
import transactionReducer from '../stores/slices/transactionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userManagement: userReducer,
    categoryManagement: categoryReducer,
    monthlyCategory: monthlyCategoryReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
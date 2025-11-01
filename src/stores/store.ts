import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../stores/slices/authSlice';
import userReducer from '../stores/slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userManagement: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
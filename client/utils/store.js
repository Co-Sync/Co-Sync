import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import { userApi } from './userApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

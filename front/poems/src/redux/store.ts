import { configureStore, ThunkAction, Action, Middleware } from '@reduxjs/toolkit';
import inputsReducer from '../features/inputs/inputSlice';
import poemsReducer from '../features/poems/poemSlice';
import userReducer from '../features/users/userSlice';
import authReducer from '../features/auth/authSlice';
import loggerMiddleware from './middleware/logger';

export const store = configureStore({
  reducer: {
    inputs: inputsReducer,
    poems: poemsReducer,
    users: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware as Middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

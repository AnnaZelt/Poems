import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import inputsReducer from '../features/inputs/inputSlice';
import poemsReducer from '../features/poems/poemSlice';
import userReducer from '../features/users/userSlice'; // Assuming this is the correct import for the usersReducer
import authReducer from '../features/auth/authSlice'; // Assuming this is the correct import for the authReducer
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    inputs: inputsReducer,
    poems: poemsReducer,
    users: userReducer,
    auth: authReducer,
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

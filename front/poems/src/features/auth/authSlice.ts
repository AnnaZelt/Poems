// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface AuthState {
  userId: number | null; // Change to allow null value
  token: string | null;
}

const initialState: AuthState = {
  token: null,
  userId: null, // Initialize userId as null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setUserId(state, action: PayloadAction<number | null>) {
      state.userId = action.payload;
    },
  },
});

export const { setToken, setUserId } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUserId = (state: RootState) => state.auth.userId;
export default authSlice.reducer;

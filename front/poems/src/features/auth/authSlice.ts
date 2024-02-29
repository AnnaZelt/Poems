// features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;

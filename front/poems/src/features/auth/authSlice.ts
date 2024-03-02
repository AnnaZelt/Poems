import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../api/apiService';

interface AuthState {
  token: string | null;
  userId: number | null;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
  error: null,
};

interface LoginPayload {
  username: string;
  password: string;
}

interface Token {
  access: string;
  refresh: string;
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

export const login = createAsyncThunk<Token, LoginPayload>(
  'auth/login',
  async ({ username, password }) => {
    try {
      const token = await apiService.login(username, password);
      localStorage.setItem('token', JSON.stringify(token)); // Store the token object
      return token;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
);





export const logout = createAsyncThunk<void, void>(
  'auth/logout',
  async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    await apiService.logout(refreshToken || '');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload;
      localStorage.setItem('userId', action.payload.toString());
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload && typeof action.payload === 'string') {
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      } else {
        state.error = 'Login failed';
      }
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      localStorage.removeItem('token');
    });
  },
});

export const { setToken, setUserId, setError } = authSlice.actions;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUserId = (state: { auth: AuthState }) => state.auth.userId;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export default authSlice.reducer;

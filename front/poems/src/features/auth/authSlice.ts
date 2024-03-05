import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../api/apiService';
import { RootState } from '../../redux/store';
import { Token } from '../../types/token';

interface AuthState {
  token: Token | null;
  refreshToken: string | null;
  userId: number | null;
  error: string | null;
}

const initialState: AuthState = {
  token: JSON.parse(localStorage.getItem('token') || 'null'), // Parse the stored token string to a token object
  refreshToken: localStorage.getItem('refresh') || 'null',
  userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
  error: null,
};

interface LoginPayload {
  username: string;
  password: string;
}

export const login = createAsyncThunk<Token, LoginPayload>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const token = await apiService.login(username, password);
      localStorage.setItem('token', JSON.stringify(token)); // Store the token object
      return token;
    } catch (error) {
      console.error('Login failed:', error);
      return rejectWithValue((error as Error).message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, { getState }) => {
    const { auth } = getState() as RootState;
    const token = auth.token;
    const response = await apiService.logout(token!);
    return response;
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<Token | null>) {
      state.token = action.payload;
    },
    setUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { access, id } = action.payload;
      state.token = { access, refresh: '', id, username: '', email: '', is_active: true }; // Update the token object
      state.userId = id;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.userId = null;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});


export const { setToken, setUserId, setError } = authSlice.actions;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUserId = (state: { auth: AuthState }) => state.auth.userId;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export default authSlice.reducer;

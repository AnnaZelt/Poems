import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../api/apiService';
import { RootState } from '../../redux/store';
import { Token } from '../../types/token';

export interface AuthState {
  isLoggedIn: boolean;
  token: Token | null;
  refreshToken: string | null;
  userId: number | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: JSON.parse(localStorage.getItem('token') || 'null'), // Parse the stored token string to a token object
  refreshToken: localStorage.getItem('refresh') || 'null',
  userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
  error: null,
};

interface LoginPayload {
  username: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  password: string;
  email: string
}

export const register = createAsyncThunk<void, RegisterPayload>(
  'auth/register',
  async ({ username, password, email }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as RootState;
      const token = auth.token;
      const response = await apiService.register(username, password, email, token!);
      return response;
    } catch (error) {
      console.error('auth: Registration failed:', error);
      return rejectWithValue((error as Error).message || 'Registration failed');
    }
  }
);


export const login = createAsyncThunk<Token, LoginPayload>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const token = await apiService.login(username, password);
      const expirationTime = new Date().getTime() + 1498 * 1000; // Set expiration time to 1498 seconds from now
      localStorage.setItem('token', JSON.stringify(token)); // Store the token object
      localStorage.setItem('tokenExpirationTime', expirationTime.toString()); // Store expiration time in milliseconds
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
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
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
      state.token = action.payload;
      state.error = null;
      state.isLoggedIn = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.token = null;
      state.userId = null;
      state.error = action.payload as string;
      state.isLoggedIn = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.userId = null;
      state.error = null;
      state.isLoggedIn = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log('Logout rejected:', action.payload); // Log the rejection payload
      state.token = null;
      state.userId = null;
      state.error = action.payload as string;
      state.isLoggedIn = false;
    });
  },
});

export const { setToken, setUserId, setError, setIsLoggedIn } = authSlice.actions;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUserId = (state: { auth: AuthState }) => state.auth.userId;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export default authSlice.reducer;

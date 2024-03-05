import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { apiService } from '../../api/apiService';
import { User } from '../../types/user';
import { Token } from '../../types/token';

interface UserState {
  currentUser: User | null;
  users: Record<number, User>; // Normalized users object
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  currentUser: null,
  users: {},
  status: 'idle',
};

export const updateUser = createAsyncThunk<User, { token: Token; userId: number; userData: Partial<User> }>(
  'users/updateUser',
  async (data, { dispatch }) => {
    const { token, userId, userData } = data;
    const updatedUser = await apiService.updateUser(token, userId, userData);
    // Update the user in the state
    dispatch(setUser(updatedUser));
    return updatedUser;
  }
);

export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async (_, { getState }) => {
  const { auth } = getState() as RootState;
  const token = auth.token!;
  const response = await apiService.getUsers(token);
  return response;
});

export const fetchUserDetail = createAsyncThunk<User, number>('users/fetchUserDetail', async (userId, { getState }) => {
  const { auth } = getState() as RootState;
  const token = auth.token!;
  const response = await apiService.getUserDetail(token, userId);
  return response;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.users[action.payload.id] = action.payload; // Update or add user to the normalized state
    },
    clearUser(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      action.payload.forEach((user) => {
        state.users[user.id] = user; // Add users to the normalized state
      });
    });
    builder.addCase(fetchUserDetail.fulfilled, (state, action) => {
      const user = action.payload;
      state.users[user.id] = user; // Update or add user to the normalized state
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUsers = (state: RootState) => Object.values(state.users.users);
export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export default userSlice.reducer;

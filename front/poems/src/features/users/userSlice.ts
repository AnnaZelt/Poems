import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { apiService } from '../../api/apiService';
import { User } from '../../types/user';
import { Token } from '../../types/token';

interface UserState {
  users: Record<number, User>; // Map user IDs to user objects
}

const initialState: UserState = {
  users: {},
};


export const updateUser = createAsyncThunk<User, { token: Token; userId: number; userData: Partial<User> }>(
  'users/updateUser',
  async (data, { dispatch }) => {
    const { token, userId, userData } = data;
    const updatedUser = await apiService.updateUser(token, userId, userData);
    // Update the user in the state
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
      state.users[action.payload.id!] = action.payload; // Update or add user to the normalized state
    },
    clearUser(state) {
      state.users = {}; // Clear all users
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      action.payload.forEach((user) => {
        if (user.id !== null) {
          state.users[user.id] = user; // Add users to the normalized state
        }
      });
    });
    builder.addCase(fetchUserDetail.fulfilled, (state, action) => {
      const user = action.payload;
      if (user.id !== null) {
        state.users[user.id] = user; // Update or add user to the normalized state
      }
    });
  },
});

export const selectUsers = (state: RootState) => Object.values(state.users);
export default userSlice.reducer;

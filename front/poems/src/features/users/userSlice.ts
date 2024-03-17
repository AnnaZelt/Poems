import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { apiService } from '../../api/apiService';
import { User } from '../../types/user';
import { Token } from '../../types/token';

interface UserState {
  users: Record<number, User>;
}

const initialState: UserState = {
  users: {},
};

export const updateUser = createAsyncThunk<User, { token: Token; userId: number; userData: Partial<User> }>(
  'users/updateUser',
  async (data) => {
    const { token, userId, userData } = data;    
    const updatedUser = await apiService.updateUser(token, userId, userData);
    return updatedUser;
  }
);

export const deleteUser = createAsyncThunk<User, { token: Token; userId: number; }>(
  'users/deleteUser',
  async (data) => {
    const { token, userId } = data;
    const removedUser = await apiService.deleteUser(token, userId);
    return removedUser;
  }
);

export const fetchUserDetail = createAsyncThunk<User, number>(
  'users/fetchUserDetail', 
  async (userId, { getState }) => {
  const { auth } = getState() as RootState;
  const token = auth.token!;
  const response = await apiService.getUserDetail(token, userId);
  return response;
});

// export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async (_, { getState }) => {
//   const { auth } = getState() as RootState;
//   const token = auth.token!;
//   const response = await apiService.getUsers(token);
//   return response;
// });

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.users[action.payload.id!] = action.payload;
    },
    clearUser(state) {
      state.users = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetail.fulfilled, (state, action) => {
      const user = action.payload;
      if (user.id !== null) {
        state.users[user.id] = user;
      }
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUsers = (state: RootState) => Object.values(state.users);
export default userSlice.reducer;

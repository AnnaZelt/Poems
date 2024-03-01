import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { apiService } from '../../api/apiService';

interface User {
  id: number;
  username: string;
  email: string;
  // active: boolean
}

interface UserState {
  currentUser:  User | null;
  users: User[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  status: 'idle'
};

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data: { token: string; userId: number; userData: Partial<User> }, { getState, dispatch }) => {
    const { token, userId, userData } = data;
    try {
      const updatedUser = await apiService.updateUser(token, userId, userData);
      // Update the user in the state
      dispatch(setUser(updatedUser));
      return updatedUser;
    } catch (error) {
      // Handle error
      throw error;
    }
  }
);

// Define types for the arguments and the return value
interface UpdateUserArgs {
  token: string;
  userId: number;
  userData: Partial<User>;
}
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { getState }) => {
  const { auth } = getState() as RootState;
  const token = auth.token;
  const response = await apiService.getUsers(token!);
  return response;
});

export const fetchUserDetail = createAsyncThunk('users/fetchUserDetail', async (userId: number, { getState }) => {
  const { auth } = getState() as RootState;
  const token = auth.token;
  const response = await apiService.getUserDetail(token!, userId);
  return response;
});


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    clearUser(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchUserDetail.fulfilled, (state, action) => {
      // Assuming the payload is a single user
      const user = action.payload;
      const existingIndex = state.users.findIndex((p) => p.id === user.id);
      if (existingIndex !== -1) {
        state.users[existingIndex] = user; // Update existing user
      } else {
        state.users.push(user); // Add new user if not found
      }
    });
  },
});


// Thunk actions (async actions)
export const loginUser = (username: string, password: string) => async (dispatch: any) => {
  try {
    // Make API call to login
    const response = await apiService.login(username, password);
    dispatch(setUser(response.data));
  } catch (error) {
    // Handle login error
  }
};

export const logoutUser = () => async (dispatch: any, getState: any) => {
  try {
    const { auth } = getState() as RootState;
    const token = auth.token;
    // Make API call to logout
    await apiService.logout(token!);
    dispatch(clearUser());
  } catch (error) {
    // Handle logout error
  }
};

export const { setUser, clearUser } = userSlice.actions;
export const selectUsers = (state: RootState) => state.users.users;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export default userSlice.reducer;

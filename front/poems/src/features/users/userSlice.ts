import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { apiService } from '../../api/apiService';

interface User {
  id: number;
  username: string;
  // Add other user properties as needed
}

interface UserState {
  user: User | null;
  // Add other user-related state as needed
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    // Add other user-related reducers as needed
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.users.user;

export const loginUser = (username: string, password: string) => async (dispatch: any) => {
  try {
    // Make API call to login
    const response = await apiService.login(username, password);
    dispatch(setUser(response.data));
  } catch (error) {
    // Handle login error
  }
};

export const logoutUser = (token:string) => async (dispatch: any) => {
  try {
    // Make API call to logout
    await apiService.logout(token);
    dispatch(clearUser());
  } catch (error) {
    // Handle logout error
  }
};

// Add other user-related thunk actions as needed

export default userSlice.reducer;

// features/poems/poemSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { apiService } from '../../api/apiService';
import { Poemtype } from '../../types/poem';
import { Token } from '../../types/token';

interface PoemState {
  poems: Poemtype[];
  selectedPoem: Poemtype | null; // Add a new field for storing the selected poem details
  token: Token | null;
  refreshToken: string | null;
  userId: number | null;
  error: string | null;
}

const initialState: PoemState = {
  poems: [],
  selectedPoem: null,
  token: null,
  refreshToken: null,
  userId: null,
  error: null,
};

export const fetchPoems = createAsyncThunk('poems/fetchPoems', async (_, { getState }) => {
  const { auth } = getState() as RootState;
  const token = auth.token; // Get the access token from the auth state
  const response = await apiService.getGeneratedPoems(token!);
  return response;
});

export const fetchPoemDetail = createAsyncThunk('poems/fetchPoemDetail', async (poemId: number, { getState }) => {
  const { auth } = getState() as RootState;
  const token = auth.token; // Get the access token from the auth state
  const response = await apiService.getPoemDetail(token!, poemId);
  return response;
});

export const deletePoem = createAsyncThunk('poems/deletePoem', async (poemId: number, { getState }) => {
  const { auth } = getState() as RootState;
  const token = auth.token; // Get the access token from the auth state
  const response = await apiService.deletePoem(token!, poemId);
  return response;
});

export const createPoem = createAsyncThunk(
  'poems/createPoem',
  async (data: { inputText: string; poetStyle: string; userId: number | null }, { getState }) => {
    try {
      const { auth } = getState() as RootState;
      const token = auth.token;
      const response = await apiService.createPoem(data.inputText, data.poetStyle, data.userId, token);

      return response;
    } catch (error) {
      console.error('Failed to create poem:', error);
      throw error;
    }
  }
);


const poemSlice = createSlice({
  name: 'poems',
  initialState,
  reducers: {
    selectPoem: (state, action) => {
      state.selectedPoem = action.payload;
    },
    clearSelectedPoem: (state) => {
      state.selectedPoem = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPoems.fulfilled, (state, action) => {
      state.poems = action.payload;
    });
    builder.addCase(fetchPoemDetail.fulfilled, (state, action) => {
      state.selectedPoem = action.payload; // Update selectedPoem with the fetched poem details
    });
    builder.addCase(createPoem.fulfilled, (state, action) => {
      state.poems.push(action.payload);
      state.selectedPoem = action.payload;
    });
    builder.addCase(createPoem.rejected, (state, action) => {
      console.log('createPoem rejected:', action.payload); // Log the rejection payload
    });
    builder.addCase(createPoem.pending, (state, action) => {
      console.log('createPoem pending'); // Log that createPoem is pending
    });
  },
});

export const { selectPoem, clearSelectedPoem } = poemSlice.actions;

export const selectPoems = (state: RootState) => state.poems.poems;
export const selectSelectedPoem = (state: RootState) => state.poems.selectedPoem; // Selector for accessing the selected poem details
export default poemSlice.reducer;

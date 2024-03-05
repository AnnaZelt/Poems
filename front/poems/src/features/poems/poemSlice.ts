// features/poems/poemSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { apiService } from '../../api/apiService';
import { Poem } from '../../types/poem';

interface PoemState {
  poems: Poem[];
}

const initialState: PoemState = {
  poems: [],
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

export const createPoem = createAsyncThunk(
  'poems/createPoem',
  async (data: { inputText: string; poetStyle: string; userId: number }, { getState }) => {
    try {
      const { auth } = getState() as RootState;
      const token = auth.token; // Get the access token from the auth state
      const response = await apiService.createPoem(data.inputText, data.poetStyle, data.userId, token!);

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPoems.fulfilled, (state, action) => {
      state.poems = action.payload;
    });
    builder.addCase(fetchPoemDetail.fulfilled, (state, action) => {
      // Assuming the payload is a single poem
      const poem = action.payload;
      const existingIndex = state.poems.findIndex((p) => p.input_id === poem.id);
      if (existingIndex !== -1) {
        state.poems[existingIndex] = poem; // Update existing poem
      } else {
        state.poems.push(poem); // Add new poem if not found
      }
    });
    builder.addCase(createPoem.fulfilled, (state, action) => {
      state.poems.push(action.payload);
    });
    builder.addCase(createPoem.rejected, (state, action) => {
      console.log('createPoem rejected:', action.payload); // Log the rejection payload
    });
    builder.addCase(createPoem.pending, (state, action) => {
      console.log('createPoem pending'); // Log that createPoem is pending
    });
  },
});

export const selectPoems = (state: RootState) => state.poems.poems;
export default poemSlice.reducer;

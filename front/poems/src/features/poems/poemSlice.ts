// features/poems/poemSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { apiService } from '../../api/apiService';

interface Poem {
  id: number;
  text: string;
}

interface PoemsState {
  poems: Poem[];
}

const initialState: PoemsState = {
  poems: [],
};

export const fetchPoems = createAsyncThunk('poems/fetchPoems', async (_, { getState }) => {
  const { auth } = getState() as RootState;
  const token = auth.token;
  const response = await apiService.getGeneratedPoems(token!);
  return response;
});

export const fetchPoemDetail = createAsyncThunk('poems/fetchPoemDetail', async (poemId: number, { getState }) => {
  const { auth } = getState() as RootState;
  const token = auth.token;
  const response = await apiService.getPoemDetail(token!, poemId);
  return response;
});

export const createPoem = createAsyncThunk('poems/createPoem', async (data: { inputText: string; poetStyle: string }, { getState }) => {
  const { auth } = getState() as RootState;
  const token = auth.token;
  const response = await apiService.createPoem(data.inputText, data.poetStyle);
  return response;
});

const poemSlice = createSlice({
  name: 'poems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPoems.fulfilled, (state, action) => {
      state.poems = action.payload;
    });
    builder.addCase(createPoem.fulfilled, (state, action) => {
      state.poems.push(action.payload);
    });
  },
});

export const selectPoems = (state: RootState) => state.poems.poems;
export default poemSlice.reducer;

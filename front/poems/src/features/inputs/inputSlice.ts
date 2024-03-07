// features/inputs/inputSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { apiService } from '../../api/apiService';

interface Input {
  id: number;
  inputText: string;
}

interface InputsState {
  inputs: Input[];
}

const initialState: InputsState = {
  inputs: [],
};

// export const fetchInputs = createAsyncThunk('inputs/fetchInputs', async (_, { getState }) => {
//   const { auth } = getState() as RootState;
//   const token = auth.token;
//   const response = await apiService.getInputs(token!);
//   return response;
// });

const inputsSlice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {},
});

export const selectInputs = (state: RootState) => state.inputs.inputs;
export default inputsSlice.reducer;

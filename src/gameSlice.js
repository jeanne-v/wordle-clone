import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  answer: {
    word: null,
    loading: false,
    error: null,
  },
};

export const fetchAnswer = createAsyncThunk("answer/fetchAnswer", async () => {
  const response = await fetch(
    "https://random-word-api.vercel.app/api?words=1&length=5"
  );
  const data = await response.json();
  return data[0];
});

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswer.pending, (state) => {
        state.answer.loading = true;
      })
      .addCase(fetchAnswer.fulfilled, (state, action) => {
        state.answer.loading = false;
        state.answer.word = action.payload;
      })
      .addCase(fetchAnswer.rejected, (state, action) => {
        state.answer.loading = false;
        state.answer.error = action.error.message;
      });
  },
});

export default gameSlice.reducer;

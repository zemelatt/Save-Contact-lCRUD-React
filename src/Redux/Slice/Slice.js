import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const newSlice = createSlice({
  name: "myValue",
  initialState,
  reducers: {
    setMyValue: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value += 2;
    },
  },
});

export const { setMyValue, decrement } = newSlice.actions;

export default newSlice.reducer;

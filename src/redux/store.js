import { configureStore } from "@reduxjs/toolkit";
import newValueReducer from "./Slice/slice";

export const store = configureStore({
  reducer: {
    myValue: newValueReducer,
  },
});

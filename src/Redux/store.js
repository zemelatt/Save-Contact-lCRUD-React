import { configureStore } from "@reduxjs/toolkit";
import newValueReducer from "./Slice/Slice";

export const store = configureStore({
  reducer: {
    myValue: newValueReducer,
  },
});

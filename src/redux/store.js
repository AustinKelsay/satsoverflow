import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./viewReducer";

export const store = configureStore({
  reducer: { view: viewReducer },
});

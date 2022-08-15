import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import viewReducer from "./viewReducer";
import questionsReducer from "./questionsReducer";

export const store = configureStore({
  reducer: { view: viewReducer, questions: questionsReducer },
  middleware: [thunk],
});

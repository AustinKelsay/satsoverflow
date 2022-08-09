import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  initialState,
});

export default store;

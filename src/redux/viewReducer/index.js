import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentView: "Questions",
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    changeView: (state, action) => {
      state.currentView = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeView } = viewSlice.actions;

export default viewSlice.reducer;

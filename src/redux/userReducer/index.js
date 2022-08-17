import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  userAdded: false,
  userAddingError: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.loading = true;
      axios
        .post("http://localhost:3000/api/users", { username: action.payload })
        .then(() => {
          state.userAdded = true;
          state.userAdding = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions;

export default userSlice.reducer;

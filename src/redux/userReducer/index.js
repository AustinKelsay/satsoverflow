import { Alert } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  currentUser: {},
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.loading = true;
      let userExists = false;
      axios
        .get(`http://localhost:3000/api/users/${action.payload}`)
        .then((res) => {
          res.data === null ? (userExists = false) : (userExists = true);
        })
        .catch((err) => {
          console.log(err);
        });

      if (!userExists) {
        axios
          .post("http://localhost:3000/api/users", { username: action.payload })
          .then((res) => {
            state.loading = false;
            state.currentUser = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions;

export default userSlice.reducer;

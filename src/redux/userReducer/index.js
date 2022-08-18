import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  currentUser: {},
  exists: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = {
        name: action.payload?.name.replace(/\s+/g, ""),
        key: action.payload?.name.replace(/\s+/g, ""),
      };
      state.loading = true;
      let userExists = false;
      state.currentUser = user;
      axios
        .get(`http://localhost:3000/api/users/${user.name}`)
        .then((res) => {
          res.data.username ? (userExists = true) : (userExists = false);
        })
        .catch((err) => {
          console.log(err);
        });

      if (!userExists) {
        console.log("user does not exist");
        axios
          .post("http://localhost:3000/api/users", {
            username: action.payload.name,
          })
          .then((res) => {
            state.loading = false;
            state.currentUser = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    checkIfUserExists: (state, action) => {
      const username = action.payload?.name.replace(/\s+/g, "");
      axios
        .get(`http://localhost:3000/api/users/${username}`)
        .then((res) => {
          res.data.username ? (state.exists = true) : (state.exists = false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export const { addUser, checkIfUserExists } = userSlice.actions;

export default userSlice.reducer;

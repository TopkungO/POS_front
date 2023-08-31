import { createSlice } from "@reduxjs/toolkit";
import { Role } from "../types";

export type UserState = {
  username: string;
  role: [Role];
  token: string;
};
const initialValue = {
  user: Array<UserState>
};
  

const appSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    LOGIN: (state, actions) => {
      state.user = actions.payload;
    },
    LOGOUT: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export const { LOGIN, LOGOUT } = appSlice.actions;
export default appSlice.reducer;

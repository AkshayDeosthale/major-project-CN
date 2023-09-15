import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  interests: string[];
  followers: string[];
  createdAt: string;
  updatedAt: string;
  avatar: string;
  __v: number;
}

// Define the initial state using that type
const initialState: User = {
  _id: "",
  username: "",
  email: "",
  password: "",
  interests: [],
  followers: [],
  createdAt: "",
  updatedAt: "",
  avatar: "",
  __v: 0,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setGlobalUser: (state, action: PayloadAction<User>) => {
      Object.assign(state, action.payload);
      localStorage.setItem("users", JSON.stringify(action.payload));
    },
  },
});

export const { setGlobalUser } = userSlice.actions;

export default userSlice.reducer;

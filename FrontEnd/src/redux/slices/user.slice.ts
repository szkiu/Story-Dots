import { createSlice } from "@reduxjs/toolkit";
import { User, UserwError } from "../../interface/User";

interface Action {
  payload: UserwError;
  type: string;
}

const initialState  = {} as User | {} as UserwError;

export const userSlice = createSlice({
  name: "userSlice",

  initialState,

  reducers: {
    setUser: (
      state,
      { payload: { uniqueName, username, email, age, image, error, id } }: Action
    ) => {
      state.uniqueName = uniqueName;
      state.username = username;
      state.email = email;
      state.age = age;
      state.image = image;
      state.id = id;
      state.error = error;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

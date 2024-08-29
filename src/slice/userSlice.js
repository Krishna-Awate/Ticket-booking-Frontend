import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userUpdate: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    userRoleUpdate: (state, action) => {
      state.userRole = action.payload;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { userUpdate, userRoleUpdate } = userSlice.actions;

export default userSlice.reducer;

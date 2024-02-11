import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/slice/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

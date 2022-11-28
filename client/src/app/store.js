import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "../features/newsSlice";
import authSlice from "../features/authSlice";

export const store = configureStore({
  reducer: {newsSlice, authSlice}
});

export default store;

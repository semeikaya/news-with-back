import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "../features/newsSlice";
import authSlice from "../features/authSlice";
import commentsSlice from "../features/commentsSlice";

export const store = configureStore({
  reducer: { newsSlice, authSlice, commentsSlice },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "../feature/book/bookSlice";

export const store = configureStore({
  reducer: {
    book: bookSlice,
  },
});

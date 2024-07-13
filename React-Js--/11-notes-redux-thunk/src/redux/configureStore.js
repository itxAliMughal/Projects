import { configureStore } from "@reduxjs/toolkit";
import notesSliceReducer from "./notesSlice";

export default configureStore({
  reducer: {
    notes: notesSliceReducer,
  },
});

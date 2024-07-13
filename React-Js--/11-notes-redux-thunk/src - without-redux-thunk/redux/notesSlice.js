import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  loading: false,
};

const notesSlice = createSlice({
  name: "NotesSlice",
  initialState,
  reducers: {},
});

export default notesSlice.reducer;

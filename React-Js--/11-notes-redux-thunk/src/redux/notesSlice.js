import { createSlice } from "@reduxjs/toolkit";
import {
  addNotesThunkMethod,
  deleteNotesThunkMethod,
  favoriteNotesThunkMethod,
  getNotesThunkMethod,
  updateNotesThunkMethod,
} from "./notesThunk";

const initialState = {
  notes: [],
  loading: false,
};

const notesSlice = createSlice({
  name: "NotesSlice",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Notes Thunk Method
      .addCase(getNotesThunkMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotesThunkMethod.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.notes = payload;
      })
      .addCase(getNotesThunkMethod.rejected, (state) => {
        state.loading = false;
      })

      // Delete Notes Thunk Method

      .addCase(deleteNotesThunkMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNotesThunkMethod.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteNotesThunkMethod.rejected, (state) => {
        state.loading = false;
      })

      // Favorite Notes Thunk Method

      .addCase(favoriteNotesThunkMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(favoriteNotesThunkMethod.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(favoriteNotesThunkMethod.rejected, (state) => {
        state.loading = false;
      })

      // Add Notes Thunk Method

      .addCase(addNotesThunkMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNotesThunkMethod.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNotesThunkMethod.rejected, (state) => {
        state.loading = false;
      })

      // Update Notes Thunk Method

      .addCase(updateNotesThunkMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNotesThunkMethod.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateNotesThunkMethod.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default notesSlice.reducer;

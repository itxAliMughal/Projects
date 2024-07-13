import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfigure";

// Get Notes

export const getNotesThunkMethod = createAsyncThunk("getNotes", async () => {
  try {
    let notes = null;
    await getDocs(collection(db, "notes")).then((querySnapshot) => {
      const notesDataRespone = querySnapshot?.docs?.map((singleDocument) => {
        return {
          id: singleDocument?.id,
          ...singleDocument.data(),
        };
      });
      notes = notesDataRespone;
    });
    return notes;
  } catch (error) {
    alert("notes is not access!");
    console.log(error);
  }
});

// Delete Notes

export const deleteNotesThunkMethod = createAsyncThunk(
  "deleteNote",
  async (singleNote, { dispatch }) => {
    try {
      const documentReference = await doc(db, "notes", singleNote?.id);

      await deleteDoc(documentReference);

      await dispatch(getNotesThunkMethod());
    } catch (error) {
      alert("note is not deleted!");
      console.log(error);
    }
  }
);

// Favorite Unfavorite Notes

export const favoriteNotesThunkMethod = createAsyncThunk(
  "favoriteNote",
  async (singleNote, { dispatch }) => {
    try {
      const documentReference = await doc(db, "notes", singleNote?.id);

      await updateDoc(documentReference, {
        ...singleNote,
        favorite: !singleNote?.favorite,
      });

      await dispatch(getNotesThunkMethod());
    } catch (error) {
      // alert(`note is not ${singleNote?.favorite}`);
      console.log(error);
    }
  }
);

// Add Notes

export const addNotesThunkMethod = createAsyncThunk(
  "addNotes",
  async (payload, { dispatch }) => {
    try {
      await addDoc(collection(db, "notes"), payload);
      await dispatch(getNotesThunkMethod());
    } catch (error) {
      console.log(error);
      alert("note is not added");
    }
  }
);

// Update Notes

export const updateNotesThunkMethod = createAsyncThunk(
  "updateNotes",
  async (updatePayload, { dispatch }) => {
    try {
      const documentReference = await doc(db, "notes", updatePayload?.id);
      await updateDoc(documentReference, updatePayload);
      await dispatch(getNotesThunkMethod());
    } catch (error) {
      console.log(error);
      alert("note is not updated");
    }
  }
);

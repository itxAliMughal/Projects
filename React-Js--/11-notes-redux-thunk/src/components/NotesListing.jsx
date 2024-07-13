import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotesThunkMethod,
  favoriteNotesThunkMethod,
  getNotesThunkMethod,
} from "../redux/notesThunk";

function NotesListing({ setEditNoteData }) {
  const [dropdownState, setDropdownState] = useState(false);
  const dispatch = useDispatch();
  const { notes: notesData } = useSelector((state) => state.notes);

  // Get Notes

  useEffect(() => {
    dispatch(getNotesThunkMethod());
  }, []);

  // Delete Section

  const deleteDocHandler = async (singleNote) => {
    dispatch(deleteNotesThunkMethod(singleNote));
  };

  // Favorite Section

  const favoriteBtnHandler = async (singleNote) => {
    dispatch(favoriteNotesThunkMethod(singleNote));
  };

  // Filter Section

  const filterNotesHandler = (event) => {
    setDropdownState(event.target.value);
  };

  const filterNotesData =
    dropdownState === "true"
      ? notesData?.filter((singleNote) => singleNote.favorite === true)
      : notesData;

  // Edit Section

  const editBtnHandler = (editNoteData) => {
    setEditNoteData(editNoteData);
  };

  return (
    <>
      <select class="browser-default mt-60" onChange={filterNotesHandler}>
        <option value="" disabled selected>
          Select Favorite Notes
        </option>
        <option value="false">Show All Notes</option>
        <option value="true">Only Favorite Notes</option>
      </select>

      <div className="notesList">
        {filterNotesData?.map((singleNote) => {
          return (
            <div className="note  white">
              <div className="right-align">
                <i
                  className="material-icons red-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => favoriteBtnHandler(singleNote)}
                >
                  {/* favorite */}
                  {singleNote?.favorite ? "favorite" : "favorite_border"}
                </i>
                <i
                  className="material-icons"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteDocHandler(singleNote)}
                >
                  delete
                </i>
              </div>
              <Link to="">
                <h5 className="black-text">{singleNote?.title}</h5>
              </Link>
              <p className="truncate">{singleNote?.content}</p>
              <div className="right-align">
                <Link to="">
                  <i
                    className="material-icons black-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => editBtnHandler(singleNote)}
                  >
                    edit
                  </i>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default NotesListing;

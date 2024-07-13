import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomSpinner from "./CustomSpinner/CustomSpinner";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfigure";

function NotesListing({ notesData, getNotes, setEditNoteData }) {
  const [loader, setLoader] = useState(false);
  const [dropdownState, setDropdownState] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const deleteDocHandler = async (singleNote) => {
    setLoader(true);

    const documentReference = await doc(db, "notes", singleNote?.id);

    await deleteDoc(documentReference);

    await getNotes();
    setLoader(false);
  };

  const favoriteBtnHandler = async (singleNote) => {
    setLoader(true);

    const documentReference = await doc(db, "notes", singleNote?.id);

    await updateDoc(documentReference, {
      ...singleNote,
      favorite: !singleNote?.favorite,
    });

    await getNotes();
    setLoader(false);
  };

  const filterNotesHandler = (event) => {
    setDropdownState(event.target.value);
  };

  const filterNotesData =
    dropdownState === "true"
      ? notesData?.filter((singleNote) => singleNote?.favorite === true)
      : notesData;

  return (
    <>
      <select class="browser-default mt-60" onChange={filterNotesHandler}>
        <option value="" disabled selected>
          Select Favotite Notes
        </option>
        <option value="false">Show All Notes</option>
        <option value="true">Only Favotite Notes</option>
      </select>

      <div className="notesList">
        <CustomSpinner loading={loader} />
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
                    onClick={() => setEditNoteData(singleNote)}
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

import React, { useState } from "react";
import NotesListing from "../components/NotesListing";
import AddNotes from "../components/AddNotes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfigure";
import CustomSpinner from "../components/CustomSpinner/CustomSpinner";

function HomePage() {
  const [notesData, setNotesData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [editNoteData, setEditNoteData] = useState(null);

  const getNotes = async () => {
    setLoader(true);
    await getDocs(collection(db, "notes")).then((querySnapshot) => {
      // console.log(querySnapshot, "querySnapshot");
      const notesDataResponse = querySnapshot?.docs?.map((singleDocument) => {
        return {
          id: singleDocument?.id,
          ...singleDocument?.data(),
        };
      });
      // console.log(notesDataResponse, "notesDataResponse");

      setNotesData(notesDataResponse);
      setLoader(false);
    });
  };

  return (
    <div className="container">
      <CustomSpinner loading={loader} />
      <div className="row center-align">
        <div className="col s7">
          <AddNotes
            getNotes={getNotes}
            editNoteData={editNoteData}
            setEditNoteData={setEditNoteData}
          />
        </div>
        <div className="col s5">
          <NotesListing
            notesData={notesData}
            getNotes={getNotes}
            setEditNoteData={setEditNoteData}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

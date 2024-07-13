import React, { useState } from "react";
import NotesListing from "../components/NotesListing";
import AddNotes from "../components/AddNotes";
import CustomSpinner from "../components/CustomSpinner/CustomSpinner";
import { useSelector } from "react-redux";

function HomePage() {
  const [editNoteData, setEditNoteData] = useState(null);
  const { loading: thunkLoader } = useSelector((state) => state.notes);

  return (
    <div className="container">
      <CustomSpinner loading={thunkLoader} />
      <div className="row center-align">
        <div className="col s7">
          <AddNotes
            editNoteData={editNoteData}
            setEditNoteData={setEditNoteData}
          />
        </div>
        <div className="col s5">
          <NotesListing setEditNoteData={setEditNoteData} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

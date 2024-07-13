import React, { useEffect, useState } from "react";
import {
  addNotesThunkMethod,
  updateNotesThunkMethod,
} from "../redux/notesThunk";
import { useDispatch, useSelector } from "react-redux";

function AddNotes({ editNoteData, setEditNoteData }) {
  const [inputFields, setInputFields] = useState(null);
  const dispatch = useDispatch();
  const { loading: thunkLoader } = useSelector((state) => state.notes);

  useEffect(() => {
    if (editNoteData) {
      setInputFields({
        title: editNoteData?.title,
        content: editNoteData?.content,
      });
    }
  }, [editNoteData]);

  // Set Input Fields

  const inputFieldsSetHandler = (event) => {
    event.preventDefault();

    const currentElement = event.target;

    setInputFields({
      ...inputFields,
      [currentElement.name]: currentElement.value,
    });
  };

  // Add or Edit

  const addNoteHandler = async (event) => {
    event.preventDefault();

    if (!inputFields?.title || !inputFields?.content) {
      alert("Please fill the input fields");
      return;
    }

    const payload = {
      ...inputFields,
      favorite: false,
    };

    if (editNoteData) {
      const updatePayload = {
        ...editNoteData,
        ...inputFields,
      };
      dispatch(updateNotesThunkMethod(updatePayload));
      setEditNoteData(null);
    } else {
      dispatch(addNotesThunkMethod(payload));
    }

    setInputFields({
      title: "",
      content: "",
    });
  };

  return (
    <div className="section form-container">
      <form className="white" onSubmit={addNoteHandler}>
        <h5 className="grey-text text-darken-3">
          {editNoteData ? "Update" : "Create"} Note
        </h5>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="note_title"
              type="text"
              className="validate"
              name="title"
              value={inputFields?.title}
              onChange={inputFieldsSetHandler}
            />
            <label className="active">Title</label>
          </div>
        </div>

        <div className="input-field col s12">
          <textarea
            id="note_content"
            className="materialize-textarea"
            name="content"
            value={inputFields?.content}
            onChange={inputFieldsSetHandler}
          ></textarea>
          <label>Content</label>
        </div>
        <button className="btn green" type="submit" disabled={thunkLoader}>
          {editNoteData ? "Update" : "Create"} Note
        </button>
      </form>
    </div>
  );
}

export default AddNotes;

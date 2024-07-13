import React, { useState } from "react";
import { apiBaseUrl } from "../../App";
import Swal from "sweetalert2";

function CreatePost({ getPosts }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [disable, setDisable] = useState(false);

  const createPostFormSubmitHandler = (event) => {
    event.preventDefault();

    if (!title || !body) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "input fields are not defined !",
      });
      return;
    }

    setDisable(true);

    const payload = {
      title,
      body,
    };

    fetch(apiBaseUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTitle("");
        setBody("");
        getPosts();
        Swal.fire("Post added successfully!", "", "success");
        setDisable(false);
        const $ = window.$;
        $("#create-post").modal("hide");
      })
      .catch((error) => {
        console.error(error);
        setDisable(false);
      });
  };

  return (
    <div className="modal fade" id="create-post">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
            <h4 className="modal-title">Create Post</h4>
          </div>
          <div className="modal-body">
            <form
              action=""
              method="POST"
              role="form"
              id="create-post-form"
              onSubmit={createPostFormSubmitHandler}
            >
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="post_title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    e.preventDefault();
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label>Body</label>
                <textarea
                  name=""
                  id="post_body"
                  cols="30"
                  rows="10"
                  placeholder="Body"
                  className="form-control"
                  value={body}
                  onChange={(e) => {
                    e.preventDefault();
                    setBody(e.target.value);
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={disable}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

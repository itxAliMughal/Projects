import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { apiBaseUrl } from "../../App";

function EditPost({ editPostId, getPosts }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (editPostId) {
      getPostById(editPostId);
    }
  }, [editPostId]);

  const getPostById = (editPostId) => {
    fetch(`${apiBaseUrl}/${editPostId}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setBody(data.body);
      });
  };
  const editPostSubmitBtnHandler = (event) => {
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

    fetch(`${apiBaseUrl}/${editPostId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getPosts();
        Swal.fire("Post updated successfully!", "", "success");
        setDisable(false);
        const $ = window.$;
        $("#edit-post").modal("hide");
      })
      .catch((error) => {
        Swal.fire("Post updated not successfully!", "", "error");
        setDisable(false);
      });
  };
  return (
    <div className="modal fade" id="edit-post">
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
            <h4 className="modal-title">Edit Post</h4>
          </div>
          <div className="modal-body">
            <form
              action=""
              method="POST"
              role="form"
              id="edit-post-form"
              onSubmit={editPostSubmitBtnHandler}
            >
              <input type="hidden" name="post_id" id="edit_post_id" />
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit_post_title"
                  placeholder="Title"
                  onChange={(e) => {
                    e.preventDefault();
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
              </div>

              <div className="form-group">
                <label>Body</label>
                <textarea
                  name=""
                  id="edit_post_body"
                  cols="30"
                  rows="10"
                  placeholder="Body"
                  className="form-control"
                  onChange={(e) => {
                    e.preventDefault();
                    setBody(e.target.value);
                  }}
                  value={body}
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

export default EditPost;

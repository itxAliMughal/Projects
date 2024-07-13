import React, { useEffect, useState } from "react";
import "./App.css";
import CreatePost from "./components/CreatePost/CreatePost";
import EditPost from "./components/EditPost/EditPost";
import Swal from "sweetalert2";
import Loader from "./components/Loader/Loader";

export const apiBaseUrl = `https://jsonplaceholder.typicode.com/posts`;

function App() {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    setLoader(true);
    fetch(apiBaseUrl)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setLoader(false);
        setPosts(data);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  const deletePostById = (postId) => {
    fetch(`${apiBaseUrl}/${postId}`, {
      method: "DELETE",
    }).then((response) => {
      let timerInterval;
      Swal.fire({
        title: "delete you item",
        html: "Wait <b></b> Seconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          getPosts();
          Swal.fire("Saved!", "", "success");
        } else {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    });
  };

  const deletePostBtnHandler = (event, postId) => {
    event.preventDefault();
    Swal.fire({
      title: "Do you want to delete this item?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        deletePostById(postId);
      }
    });
  };

  const editPostBtnHandler = (event, postId) => {
    event.preventDefault();
    setEditPostId(postId);

    const $ = window.$;
    $("#edit-post").modal("show");
    console.log(editPostId);
  };

  return (
    <React.Fragment>
      <Loader loader={loader} />
      <div className="container">
        <h1>Posts</h1>
        <a className="btn btn-primary" data-toggle="modal" href="#create-post">
          Create Post
        </a>

        <CreatePost getPosts={getPosts} />

        <EditPost editPostId={editPostId} getPosts={getPosts} />

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Post Id</th>
              <th>User Id</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="todos-listing">
            {posts.map((singlePost) => {
              return (
                <tr key={singlePost.id}>
                  <td>{singlePost.id}</td>
                  <td>{singlePost.userId}</td>
                  <td>{singlePost.title}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={(event) =>
                        editPostBtnHandler(event, singlePost.id)
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(event) =>
                        deletePostBtnHandler(event, singlePost.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default App;

const apiBaseUrl = `https://jsonplaceholder.typicode.com/posts`;
const createPostFoam = document.querySelector("#create-post-form");
const titleInputField = document.querySelector("#post_title");
const BodyInputField = document.querySelector("#post_body");
const tbody = document.querySelector("#todos-listing");
const editPostFoam = document.querySelector("#edit-post-form");
const editPostFoamId = document.querySelector("#edit_post_id");
const editPostFoamTitle = document.querySelector("#edit_post_title");
const editPostFoamBody = document.querySelector("#edit_post_body");
const selectLoader = document.querySelector(".loader-container");

// Working in task submit foam
createPostFoam.addEventListener("submit", function (event) {
  event.preventDefault();
  const createPostFormBtn = document.querySelector("#create-post-form button");
  const titleInputFieldValue = titleInputField?.value;
  const BodyInputFieldValue = BodyInputField?.value

if (!titleInputFieldValue || !BodyInputFieldValue) {
  alert("please fill input fields");
  return;
}

  const body = {
    title: titleInputFieldValue,
    body: BodyInputFieldValue,
  };

  createPostFormBtn.setAttribute("disabled", "disabled");

  selectLoader.style.display = "flex";

  fetch(apiBaseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  })
  .then(async (data) => {
    const jsonData = await data.json();
    console.log(jsonData, "jsonData");
    titleInputField.value = "";
    BodyInputField.value = "";
    $("#create-post").modal("hide");
    createPostFormBtn.removeAttribute("disabled");
    selectLoader.style.display = "none";
  })
  .catch((error) => {
    // console.log(error)
    createPostFormBtn.removeAttribute("disabled");
    alert("oops something went wrong");
    selectLoader.style.display = "none";
  });
});

// Dummy data append tbody

const getPosts = () => {
  selectLoader.style.display = "flex";
  return(
    fetch(apiBaseUrl)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data, "data");
      let output = "";
      data?.forEach((singleData) => {
        output +=`<tr>
        <td>${singleData?.id}</td>
        <td>${singleData?.userId}</td>
        <td>${singleData?.title}</td>
        <td>
         <a class="btn btn-primary edit-btn"  href="#edit-post" data-post-id="${singleData?.id}">Edit</a>
         </td>
        <td>
        <a href="#" class="btn btn-danger delete-btn" data-post-id="${singleData?.id}">Delete</a>
        </td>
      </tr>`;

      // console.log(output, "output");
      // tbody.append(output);
      tbody.innerHTML = output;
      selectLoader.style.display = "none";
      });
    })
    .catch((error) => {
      console.log(error);
      selectLoader.style.display = "none";
    })
  );
};
getPosts();

const getPostById = (postId) => {
  return(
    fetch(`${apiBaseUrl}/${postId}`)
    .then(data => data.json())
    .then(data => {
      console.log(data, "data");
      return data;
    })
    .catch(console.error())
  );
};

// Edit Post foam
editPostFoam.addEventListener("submit", function (e) {
  e.preventDefault();
  // const editPostFormBtn = document.querySelector("#edit-post-form button");
  const editPostFoamIdValue = editPostFoamId?.value;
  const editPostFoamTitleValue = editPostFoamTitle?.value;
  const editPostFoamBodyValue = editPostFoamBody?.value

  if (!editPostFoamIdValue ||!editPostFoamTitleValue ||!editPostFoamBodyValue) {
    alert("oops something went wrong! we cannot edit the post");
    return;
  }

  const body = {
    title: editPostFoamTitleValue,
    body: editPostFoamBodyValue,
  };

  selectLoader.style.display = "flex";

  fetch(`${apiBaseUrl}/${editPostFoamIdValue}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  })
  .then(async (data) => {
    const jsonData = await data.json();
    console.log(jsonData, "jsonData");
    $("#edit-post").modal("hide");
   await getPosts();
    selectLoader.style.display = "none";
  })
  .catch(console.error());
});

// Bind click tbody for access delete button and edit button
tbody.addEventListener("click", async function (event) {
  event.preventDefault();
  const currentElement = event.target;

  if (currentElement.classList.contains("delete-btn") && confirm("Are you sure ?")) {
    const postId = currentElement.getAttribute("data-post-id");
    selectLoader.style.display = "flex";
    fetch(`${apiBaseUrl}/${postId}`, {
      method: "DELETE",
    })
    .then(async (data) => {
      const convertData = await data.json();
      // console.log(convertData, "convertData");
      getPosts();
      selectLoader.style.display = "none";
    })
    .catch(console.error());
    currentElement.parentElement.parentElement.remove();
  };

  if (currentElement.classList.contains("edit-btn")) {
    const postId = currentElement.getAttribute("data-post-id");
    selectLoader.style.display = "flex";
    const singleData = await getPostById(postId);
    selectLoader.style.display = "none";
    $("#edit-post").modal("show")

    editPostFoamId.value = singleData?.id,
    editPostFoamTitle.value = singleData?.title,
    editPostFoamBody.value = singleData?.body;
  };
});



// REQUEST METHODS  
/*  

Rest Api Pattern

Request Methods

GET	    /posts              (get all posts)
GET	    /posts/1            (get post by id)
GET	    /comments?postId=1  (get post comments by postId)
POST	  /posts              (create post)
PUT	    /posts/1            (update specific post with all data like title,body)
PATCH	  /posts/1            (update specific post partially with some data like only title or body)
DELETE  /posts/1            (delete post by id)


*/

const bookForm = document.querySelector("#book-form");
const bookList = document.querySelector("#book-list");
const containerDiv = document.querySelector(".container");


function UI() {}

UI.prototype.addBook = function (bookObject) {
  const newElement = document.createElement("tr");
  newElement.innerHTML = `
  <td>${bookObject.title}</td>
  <td>${bookObject.author}</td>
  <td>${bookObject.isbn}</td>
  <td><a href="#" class="delete">X<a></td>`

  bookList.append(newElement);
};

UI.prototype.showAlert = function (message = "", className = "success") {
  const divElement = document.createElement("div");
  divElement.className = `alert ${className}`
  divElement.innerText = message;

  containerDiv.insertBefore(divElement, bookForm)

  setTimeout(function () {
    divElement.remove();
  }, 2000);
};

UI.prototype.removeBook = function(currentElement) {
   currentElement.parentElement.parentElement.remove();
}

function createBookObject(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
};

const uiVariable = new UI();  // UI fnc bahir he initialize kara dia take isko globaly acces kar saken

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const isbn = document.querySelector("#isbn");

 if (!title.value || !author.value || !isbn.value) {
  alert("please fill the input fields")
  return;
 }

  // const bookObject = {
  //   title: title.value,
  //   author: author.value,
  //   isbn: isbn.value,
  // };

  const bookObject = new createBookObject(
    title.value,
    author.value,
    isbn.value
  );

  uiVariable.addBook(bookObject);
  uiVariable.showAlert("Book added successfully");

  // const newElement = document.createElement("tr");
  // newElement.innerHTML = `
  // <td>${title.value}</td>
  // <td>${author.value}</td>
  // <td>${isbn.value}</td>
  // <td><a href="#" class="delete">X<a></td>`

  // bookList.append(newElement);

title.value = "";
author.value = "";
isbn.value = "";

});

bookList.addEventListener("click", function (event) {
  event.preventDefault();
  const currentElement = event.target;
  if (currentElement.classList.contains("delete") && confirm("Are You Sure ?")) {
    // currentElement.parentElement.parentElement.remove();
    uiVariable.removeBook(currentElement);
    uiVariable.showAlert("Book is removed succesfully", "error")
  }
});

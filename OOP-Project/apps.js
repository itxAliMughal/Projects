const taskFoam = document.querySelector("#task-form"); 
const taskList = document.querySelector(".collection");
const clearTask = document.querySelector(".clear-tasks"); 
const containerDiv = document.querySelector(".container");
const refreshBtn = document.querySelector(".refresh-btn");
const taskHeading = document.querySelector(".card-title");
const thanks = document.querySelector(".thanks-btn");


function UI() {};

UI.prototype.addTask = function (taskObject) {
  const newTask = document.createElement("li");        
  newTask.className = "collection-item";
  newTask.innerHTML = `
  ${taskObject.inputField}
  <a href="#" class="delete-item secondary-content">
    <i class="fa fa-remove"></i>
  </a>`

  taskList.append(newTask);
};

function TasklistObject(inputField) {
  this.inputField = inputField;
};

UI.prototype.showAlert = function (message = "", className = "success") {
  const divElement = document.createElement("div");
  divElement.className = `alert ${className}`
  divElement.innerHTML =  ` <div class="animate__animated animate__lightSpeedInRight" id="animate"> 
  <div class="alert success" style="color: red; text-align: center; font-weight:bold; font-size:20px; background-color:white; ">Task added successfull!</div>  
</div>`;

  taskHeading.appendChild(divElement)  

  setTimeout(function () {
    divElement.remove();
  }, 2000);
};

UI.prototype.removeItem = function () {
  const currentElement = event.target;
      
      if (confirm("Are You Sure?")) {
        const parentElement = currentElement.parentElement.parentElement;

        parentElement.innerHTML = ` <div class="animate__animated animate__lightSpeedInRight" id="animate"> 
        <div class="alert success" style="color: red; text-align: center; font-weight:bold; font-size:20px; background-color:white; ">Task are Cleared</div>  
      </div>`;

        setTimeout(function () {
          parentElement.remove();
        }, 2000);
      };
};

UI.prototype.allTaskClear = function () {
  if (taskList.children.length > 0) {
    if (confirm("Sure ???")) {
      taskList.innerHTML = ` <div class="animate__animated animate__lightSpeedInRight" id="animate"> 
      <div class="alert success" style="color: blue; font-weight:bold; text-align: center; font-size: 32px; background-color:white; padding: 50px;">All Tasks are Cleared</div>  
    </div>`;
     };
    
     setTimeout(function () {
      taskList.innerHTML = "";
     }, 2000)

  } else {
    taskList.innerHTML = ` <div class="animate__animated animate__lightSpeedInLeft" id="animate"> 
    <div class="alert success" style="color: red; font-weight:bold; text-align: center; font-size: 32px; background-color:white; padding: 50px;">Tasks have already been cleared Please add tasks again.</div>  
  </div>`

  setTimeout(function () {
    taskList.innerHTML = "";
   }, 3000)
  };
};

UI.prototype.refresh = function () {
  taskList.innerHTML = ` <div class="animate__animated animate__lightSpeedInLeft" id="animate"> 
  <div class="alert success" style="color: red; font-weight:bold; text-align: center; font-size: 32px; background-color:white; padding: 50px;">Please Wait</div>  
</div>`

setTimeout(function () {
  window.location.reload();
}, 3000)
};

UI.prototype.thanks = function () {
  taskList.innerHTML = ` <div class="animate__animated animate__bounce" id="animate"> 
  <div class="alert success" style="color: red; font-weight:bold; text-align: center; font-size: 32px; background-color:white; padding: 50px;">Thanks For Watching</div>  
</div>`

setTimeout(function () {
  window.location.reload();
}, 3000)
};

const uiVariable = new UI();

// Add task

taskFoam.addEventListener("submit", function (event) {    // ye foam submit par kam ho rha he 
  event.preventDefault();

  const inputField = document.querySelector("#task");     // ye input field select kari he take iski value nikal saku

  if (!inputField.value) {
    alert("please fill the input field")                 
    return;
  };

const taskObject = new TasklistObject(
  inputField.value,
);

uiVariable.addTask(taskObject);
uiVariable.showAlert("task added successfully!");

  inputField.value = "";

  removeButtonHandler();
});

// Delete item button

function removeButtonHandler() {
  const deleteBtns = document.querySelectorAll(".delete-item");

  deleteBtns.forEach(function (singleDeleteBtn) {
    singleDeleteBtn.addEventListener("click", function (event) {
      event.preventDefault();
      uiVariable.removeItem();
    });
  });
};

// removeButtonHandler();

// Clear task button

clearTask.addEventListener("click", function (event) {
  event.preventDefault();
  uiVariable.allTaskClear();
});

// Refresh button

refreshBtn.addEventListener("click", function (event) {
  event.preventDefault();
  uiVariable.refresh();
});

// Thanks button

thanks.addEventListener("click", function (event) {
  event.preventDefault();
 uiVariable.thanks();
});
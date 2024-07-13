import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";

const localStorageKey = "tasks";

export const saveArrayInLocalStorage = (array) => {
  localStorage.setItem(localStorageKey, JSON.stringify(array));
};

export const getArrayInLocalStorage = () => {
  return JSON.parse(localStorage.getItem(localStorageKey));
};

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    //it will run on first time component re-load
    const taskListFromLocalStorage = getArrayInLocalStorage();
    if (taskListFromLocalStorage) {
      setTaskList(taskListFromLocalStorage);
    }
  }, []);

  const clearTaskBtnHandler = (event) => {
    event.preventDefault();

    if (window.confirm("Are you sure ?")) {
      saveArrayInLocalStorage([]);
      setTaskList([]);
    }
  };

  const deleteTaskBtnHandler = (index) => {
    // console.log(index,'delete btn click is working')
    if (window.confirm("Are you sure ?")) {
      const tempTaskList = [...taskList];
      tempTaskList.splice(index, 1);

      saveArrayInLocalStorage(tempTaskList);
      setTaskList(tempTaskList);
    }
  };

  const filterInputHandler = (event) => {
    setFilterInput(event.target.value);
  };

  // const filteredTaskList = taskList.filter(singleValue => singleValue !== "Task One");
  const filteredTaskList = taskList.filter((singleValue) =>
    singleValue.toLowerCase().includes(filterInput.toLowerCase())
  );
  // "Task One".includes("One") true
  // "Task One".includes("Ones") false
  // "Task One".includes("") true
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <div id="main" className="card">
            <div className="card-content">
              <span className="card-title">Task List</span>
              <TaskForm
                taskInput={taskInput}
                setTaskInput={setTaskInput}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            </div>
            <div className="card-action">
              <h5 id="task-title">Tasks</h5>
              <div className="input-field col s12">
                <input
                  type="text"
                  name="filter"
                  id="filter"
                  value={filterInput}
                  onChange={filterInputHandler}
                />
                <label>Filter Task</label>
              </div>
              <TaskList
                taskList={filteredTaskList}
                deleteTaskBtnHandler={deleteTaskBtnHandler}
              />
              <a
                className="clear-tasks btn black"
                onClick={clearTaskBtnHandler}
              >
                Clear Tasks
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

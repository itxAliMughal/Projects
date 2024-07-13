import React from "react";
import { saveArrayInLocalStorage } from "../../App";

const TaskForm = (props) => {
  const { taskInput, setTaskInput, taskList, setTaskList } = props;
  // console.log(props, "props");

  const taskInputHandler = (event) => {
    event.preventDefault();
    setTaskInput(event.target.value);
  };

  const taskFormSubmitHandler = (event) => {
    event.preventDefault();
    if (!taskInput) {
      alert("please fill the task input field!");
      return;
    }

    const taskListTemp = [...taskList];
    taskListTemp.push(taskInput);

    console.log(taskListTemp, "taskListTemp");

    saveArrayInLocalStorage(taskListTemp);
    setTaskList(taskListTemp);
    setTaskInput("");
  };

  return (
    <form id="task-form" onSubmit={taskFormSubmitHandler}>
      <div className="row">
        <div className="input-field col s12">
          <input
            type="text"
            name="task"
            id="task"
            onChange={taskInputHandler}
            value={taskInput}
            // value="Moiz "
          />
          <label>New Task</label>
        </div>
      </div>
      <input type="submit" value="Add Task" className="btn" />
    </form>
  );
};

export default TaskForm;

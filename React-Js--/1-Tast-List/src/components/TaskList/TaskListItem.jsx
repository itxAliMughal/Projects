import React from "react";

const TaskListItem = ({ name, deleteTaskBtnHandler, index }) => {
  return (
    <li className="collection-item">
      {name}
      <a href="#" className="delete-item secondary-content">
        <i
          className="fa fa-remove"
          onClick={() => deleteTaskBtnHandler(index)}
        ></i>
      </a>
    </li>
  );
};

export default TaskListItem;

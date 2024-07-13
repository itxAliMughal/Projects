import React from "react";
import TaskListItem from "./TaskListItem";

const TaskList = (props) => {
  const { taskList, deleteTaskBtnHandler } = props;
  return (
    <ul className="collection">
      {taskList.map((singleTaskList, index) => {
        return (
          <TaskListItem
            key={index}
            name={singleTaskList}
            deleteTaskBtnHandler={deleteTaskBtnHandler}
            index={index}
          />
        );
      })}
    </ul>
  );
};

export default TaskList;

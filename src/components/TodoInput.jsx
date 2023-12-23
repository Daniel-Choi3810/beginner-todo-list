import React, { useContext } from "react";
import { useTask } from "../context/TaskContext";

/**
 * Input component that creates a todo when the user enters a todo title
 */
export default function TodoInput() {
  const { taskTitle, setTaskTitle } = useTask(); // Custom hook that returns the task and setTask function from the taskTitle Context
  return (
    <input
      value={taskTitle}
      onChange={(e) => {
        setTaskTitle(e.target.value);
      }}
      className="w-1/3 border-b border-transparent focus:border-white focus:transition-all bg-transparent text-white focus:outline-0"
      placeholder="Add Task"
    />
  );
}

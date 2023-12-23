import React, { useContext } from "react";
import { useTask } from "../context/TaskContext";

/**
 * Input component that creates a todo when the user enters a todo title
 */
export default function TodoInput() {
  const { task, setTask } = useTask(); // Custom hook that returns the task and setTask function from the taskTitle Context
  return (
    <input
      value={task}
      onChange={(e) => {
        setTask(e.target.value);
      }}
      className="w-1/3 border-b border-transparent focus:border-white focus:transition-all bg-transparent text-white focus:outline-0"
      placeholder="Add Task"
    />
  );
}

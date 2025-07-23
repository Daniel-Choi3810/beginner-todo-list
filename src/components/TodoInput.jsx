import React from "react";
import { useTask, useTaskDueDate } from "../context/TaskContext";

/**
 * Input component that creates a todo when the user enters a todo title
 */
export default function TodoInput() {
  const { taskTitle, setTaskTitle } = useTask(); // Custom hook that returns the task title state
  const { taskDueDate, setTaskDueDate } = useTaskDueDate(); // Custom hook that returns the task due date state
  return (
    <>
      <input
        value={taskTitle}
        onChange={(e) => {
          setTaskTitle(e.target.value);
        }}
        className="w-1/3 border-b border-transparent focus:border-white focus:transition-all bg-transparent text-white focus:outline-0"
        placeholder="Add Task"
      />
      <input
        type="date"
        value={taskDueDate}
        onChange={(e) => setTaskDueDate(e.target.value)}
        className="ml-2 border rounded bg-transparent text-white focus:outline-0"
      />
    </>
  );
}

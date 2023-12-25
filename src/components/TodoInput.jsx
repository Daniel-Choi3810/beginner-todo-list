import React, { useState } from "react";
import {
  useChangeTask,
  useTaskDescription,
  useTaskTitle,
} from "../context/TaskContext";
import { AiFillPlusCircle } from "react-icons/ai";

/**
 * Input component that creates a todo when the user enters a todo title
 */
export default function CreateTaskInput() {
  const { taskTitle, setTaskTitle } = useTaskTitle(); // Custom hook that returns the task and setTask function from the taskTitle Context
  const { taskDescription, setTaskDescription } = useTaskDescription(); // Custom hook that returns the task and setTask function from the taskTitle Context
  const [isAddEditable, setIsAddEditable] = useState(false);

  return (
    <div className="w-2/3 h-full flex justify-center items-start">
      {isAddEditable ? (
        <div className="w-full h-full relative flex flex-col items-end">
          <div className="flex flex-col w-full h-1/3 p-2 border rounded-lg mb-4">
            <input
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }}
              className="text-white w-full bg-transparent text-md border-none rounded-lg focus:outline-none"
              placeholder="Task Name"
            />
            <input
              value={taskDescription}
              onChange={(e) => {
                setTaskDescription(e.target.value);
              }}
              className="text-white w-full bg-transparent text-md border-none rounded-lg focus:outline-none"
              placeholder="Description"
            />
          </div>
          <div>
            <button
              className="mr-4 px-4 border rounded-full"
              onClick={() => {
                setIsAddEditable(false);
              }}
            >
              Cancel
            </button>
            <AddTaskButton setIsAddEditable={setIsAddEditable} />
          </div>
        </div>
      ) : (
        <div
          className="w-full hover:text-red-500 flex items-center cursor-pointer mx-5"
          onClick={() => {
            setIsAddEditable(true);
          }}
        >
          <AiFillPlusCircle className="mr-4" />
          <h1>Add Task</h1>
        </div>
      )}
    </div>
  );
}

/**
 * Renders a button component for adding a task.
 * Button is functional only if the task is not empty.
 */
function AddTaskButton({ setIsAddEditable }) {
  const { taskTitle } = useTaskTitle();
  const { addTask } = useChangeTask();
  return (
    <button
      disabled={taskTitle === "" ? true : false}
      onClick={() => {
        addTask();
        setIsAddEditable(false);
      }}
      className={`${
        taskTitle === ""
          ? "bg-slate-500 opacity-40"
          : "bg-slate-500 hover:bg-slate-600"
      } font-semibold text-lg
       text-white rounded-full w-24`}
    >
      Add
    </button>
  );
}

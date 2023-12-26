import { UpdateTaskButton } from "./TaskButtons";
import TodoCheckBox from "./TodoCheckBox";

import { AiOutlineMenu } from "react-icons/ai";
import { DayPicker } from "react-day-picker";
import { parse } from "date-fns";
import { useState } from "react";
import { useChangeTask } from "../../context/TaskContext";

export default function TodoModal({
  closeModal,
  editTaskTitle,
  setEditTaskTitle,
  isEditEnabled,
  setIsEditEnabled,
  editTaskDescription,
  setEditTaskDescription,
  editTaskDueDate,
  setEditTaskDueDate,
  todo,
  isComplete,
  setIsComplete,
}) {
  const { updateTaskTitle, updateTaskDescription, updateTaskDueDate } =
    useChangeTask(); // Custom hook to access the ChangeTask Context

  // Function for handling the update button click in the modal
  function handleUpdateClick(e) {
    e.stopPropagation();
    // console.log(editTaskTitle);
    updateTaskTitle(todo.id, editTaskTitle);
    updateTaskDescription(todo.id, editTaskDescription);
    updateTaskDueDate(todo.id, editTaskDueDate);
    if (isEditEnabled) {
      setIsEditEnabled(false);
    }
  }

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-10"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex flex-col bg-slate-700 rounded-lg h-[95%] md:max-w-[850px] w-[95%] shadow-lg relative"
      >
        <div className="h-[50px] w-full border-b border-slate-500 flex justify-between items-center px-2">
          <p className="ml-2 italic">Added on {todo.currDate}</p>
          <button className="m-2" onClick={closeModal}>
            X
          </button>
        </div>
        <div className="grid sm:grid-cols-3 h-full ">
          <div className="sm:col-span-2">
            <div className="mt-4 flex items-start w-full text-white">
              <TodoCheckBox
                style="checkbox checkbox-success mt-4 mx-4 h-5 w-5 rounded-full"
                isComplete={isComplete}
                setIsComplete={setIsComplete}
                id={todo.id}
              />
              {isEditEnabled ? ( // Conditional rendering for the task title being editable
                <div>
                  <EditTaskInput
                    initialTaskTitle={todo.taskTitle}
                    initialDescription={todo.description}
                    initialDueDate={parse(todo.dueDate, "PP", new Date())}
                    disableEdit={() => {
                      setIsEditEnabled(false);
                    }}
                    editTaskTitle={editTaskTitle}
                    setEditTaskTitle={setEditTaskTitle}
                    editTaskDescription={editTaskDescription}
                    setEditTaskDescription={setEditTaskDescription}
                    editTaskDueDate={editTaskDueDate}
                    setEditTaskDueDate={setEditTaskDueDate}
                    handleUpdateClick={handleUpdateClick}
                  />
                </div>
              ) : (
                <div
                  className="w-full flex flex-col p-2 items-start justify-start"
                  onClick={() => {
                    setIsEditEnabled(true);
                  }}
                >
                  <h2 className="text-2xl font-bold ">{todo.taskTitle}</h2>
                  <div className="flex items-center text-gray-400">
                    {todo.description === "" && <AiOutlineMenu />}
                    <h3 className={`${todo.description === "" ? "ml-2" : ""}`}>
                      {todo.description === ""
                        ? "Description"
                        : todo.description}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-600 flex flex-col items-center w-full pt-4 px-3 rounded-br-lg">
            <div className="w-[90%] border-b border-slate-500 hover:bg-slate-500 flex transition-colors">
              <button className="py-2">Due date: {todo.dueDate}</button>
            </div>
            <div className="w-[90%] border-b border-slate-500 hover:bg-slate-500 flex transition-colors">
              <button className="py-2">Priority</button>
            </div>
            <div className="w-[90%] border-b border-slate-500 hover:bg-slate-500 flex transition-colors">
              <button className="py-2">Labels</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Input component for editing a task's title
 * @param {string} editTaskTitle - The title of the task being edited
 * @param {function} setEditTaskTitle - The function to set the title of the task being edited
 * @param {function} handleUpdateClick - The function to handle the update button click
 * @returns
 */
function EditTaskInput({
  initialTaskTitle,
  initialDescription,
  initialDueDate,
  disableEdit,
  editTaskTitle,
  setEditTaskTitle,
  editTaskDescription,
  setEditTaskDescription,
  editTaskDueDate,
  setEditTaskDueDate,
  handleUpdateClick,
}) {
  const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: white;
    color: black;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: white;
  }
`;
  return (
    <div className="flex flex-col items-start w-full">
      <style>{css}</style>

      <div className="flex flex-col w-[90%] p-2 border rounded-lg">
        <input
          value={editTaskTitle}
          onChange={(e) => {
            setEditTaskTitle(e.target.value);
          }}
          className="bg-transparent text-2xl font-bold border-none rounded-lg focus:outline-none"
        />
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            setEditTaskDescription(e.target.textContent);
          }}
          className="bg-transparent border-b w-3/5 focus:outline-none text-left"
        >
          {editTaskDescription}
        </div>
      </div>
      <div className="flex justify-end w-[90%]">
        <UpdateTaskButton
          handleUpdateClick={handleUpdateClick}
          editTask={editTaskTitle}
        />
        <button
          onClick={() => {
            disableEdit();
            setEditTaskTitle(initialTaskTitle);
            setEditTaskDescription(initialDescription);
            setEditTaskDueDate(initialDueDate);
          }}
        >
          Cancel
        </button>
      </div>
      <DayPicker
        fromYear={new Date().getFullYear()}
        disabled={(date) => {
          const today = new Date();
          const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          );
          return date < startOfDay;
        }}
        modifiersClassNames={{
          selected: "my-selected",
          today: "my-today",
        }}
        mode="single"
        selected={editTaskDueDate}
        onSelect={setEditTaskDueDate}
      />
    </div>
  );
}

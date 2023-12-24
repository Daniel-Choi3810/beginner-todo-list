import React, { useState } from "react";
import {
  useChangeTask,
  useTodos,
  useUpdateTaskStatus,
} from "../../context/TaskContext";
import {
  DeleteTaskButton,
  UpdateTaskButton,
} from "./todoTaskComponents/TaskButtons";

/**
 * Renders a flexbox container for displaying todo tasks.
 */
export default function TodoFlexBox() {
  const { todos } = useTodos();
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {todos.map((todo) => (
        <TodoTask key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

/**
 * Represents a todo
 * @typedef {Object} todo
 * @property {string} id - The id of the todo
 * @property {title} string - the title of the todo
 * @property {status} boolean - The completion status of the todo
 */

/**
 * To-do component - Displays a single todo item.
 *
 * @param {Object} props - Component props.
 * @param {todo} props.todo - The todo item to display.
 */
function TodoTask({ todo }) {
  const [todoTask, setTodoTask] = useState(todo); // useState hook for the todo Object prop
  const [isComplete, setIsComplete] = useState(todo.status); // useState hook for the todo Object prop's status
  const { updateTaskTitle } = useChangeTask(); // Custom hook to access the ChangeTask Context

  const [isModalOpen, setIsModalOpen] = useState(false); // useState hook for determining if the task's modal is open
  const [isEditEnabled, setIsEditEnabled] = useState(false); // useState hook for determining if the task's title is editable
  const [editTaskTitle, setEditTaskTitle] = useState(todo.title); // useState hook for the task's title

  // Function for opening the todo's modal
  function openModal() {
    setIsModalOpen(true);
    setEditTaskTitle(todoTask.title);
    setIsEditEnabled(false);
  }

  // Function for closing the todo's modal
  function closeModal(e) {
    e.stopPropagation();
    setIsModalOpen(false);
    setEditTaskTitle(todoTask.title);
  }

  // Function for handling the update button click in the modal
  function handleUpdateClick(e) {
    e.stopPropagation();
    setTodoTask({ ...todo, title: editTaskTitle });
    updateTaskTitle(todo.id, editTaskTitle);
    if (isEditEnabled) {
      setIsEditEnabled(false);
    }
  }

  return (
    <div
      onClick={openModal}
      className="flex flex-col justify-center items-center m-2 w-4/5 h-12 bg-slate-600 px-8
      rounded-3xl shadow-md hover:shadow-2xl hover:bg-slate-700 relative"
    >
      <TodoCheckBox
        style={"absolute left-4 checkbox checkbox-success h-4 w-4"}
        isComplete={isComplete}
        id={todo.id}
        setIsComplete={setIsComplete}
      />
      <p
        className={`${
          isComplete ? "text-gray-400 line-through" : "text-white"
        }`}
      >
        {todoTask.title}
      </p>
      {isModalOpen && ( // Conditional rendering for the modal being open
        <TodoModal
          isComplete={isComplete}
          setIsComplete={setIsComplete}
          closeModal={closeModal}
          isEditEnabled={isEditEnabled}
          editTaskTitle={editTaskTitle}
          setEditTaskTitle={setEditTaskTitle}
          handleUpdateClick={handleUpdateClick}
          setIsEditEnabled={setIsEditEnabled}
          todoTask={todoTask}
        />
      )}
      <DeleteTaskButton id={todo.id} />
    </div>
  );
}

/**
 * Checkbox component to determine the completion status of a todo
 * @param {boolean} isComplete - The completion status of the todo
 * @param {string} id - The id of the todo
 * @param {function} setIsComplete - The function to set the completion status of the todo
 * @returns
 */
function TodoCheckBox({ isComplete, id, setIsComplete, style }) {
  const { updateTaskStatus } = useUpdateTaskStatus(); // Custom hook to access the UpdateTaskStatus Context

  return (
    <input
      type="checkbox"
      checked={isComplete}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onChange={(e) => {
        setIsComplete(!isComplete);
        updateTaskStatus(id, e.target.checked);
      }}
      className={style}
    />
  );
}

/**
 * Input component for editing a task's title
 * @param {string} editTaskTitle - The title of the task being edited
 * @param {function} setEditTaskTitle - The function to set the title of the task being edited
 * @param {function} handleUpdateClick - The function to handle the update button click
 * @returns
 */
function EditTaskTitleInput({
  editTaskTitle,
  setEditTaskTitle,
  handleUpdateClick,
}) {
  return (
    <div className="relative flex justify-center items-center">
      <input
        value={editTaskTitle}
        onChange={(e) => {
          setEditTaskTitle(e.target.value);
        }}
        className="bg-transparent border p-1 rounded-lg"
      />
      <UpdateTaskButton
        handleUpdateClick={handleUpdateClick}
        editTask={editTaskTitle}
      />
    </div>
  );
}

function TodoModal({
  closeModal,
  isEditEnabled,
  editTaskTitle,
  setEditTaskTitle,
  handleUpdateClick,
  setIsEditEnabled,
  todoTask,
  isComplete,
  setIsComplete,
}) {
  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex flex-col bg-slate-700 rounded-lg h-[95%] md:max-w-[800px] w-[100%] shadow-lg relative"
      >
        <div className="h-[50px] w-full border-b border-slate-500 flex justify-between items-center px-2">
          <p>Lorem</p>
          <button className="m-2" onClick={closeModal}>
            X
          </button>
        </div>
        <div className="grid sm:grid-cols-3 h-full ">
          <div className="sm:col-span-2">
            <div className="mt-4 flex justify-start items-center text-white">
              <TodoCheckBox
                style="checkbox checkbox-success mx-4 h-4 w-4"
                isComplete={isComplete}
                setIsComplete={setIsComplete}
                id={todoTask.id}
              />
              {isEditEnabled ? ( // Conditional rendering for the task title being editable
                <EditTaskTitleInput
                  editTaskTitle={editTaskTitle}
                  setEditTaskTitle={setEditTaskTitle}
                  handleUpdateClick={handleUpdateClick}
                />
              ) : (
                <div
                  onClick={() => {
                    setIsEditEnabled(true);
                  }}
                >
                  <h2 className="text-lg font-bold">{todoTask.title}</h2>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-600 h-full w-full pt-4">Due date</div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useChangeTask, useTodos } from "../../context/TaskContext";
import { DeleteTaskButton } from "./todoTaskComponents/TaskButtons";
import TodoModal from "./todoTaskComponents/TodoModal";
import TodoCheckBox from "./todoTaskComponents/TodoCheckBox";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // useState hook for determining if the task's modal is open
  const [isEditEnabled, setIsEditEnabled] = useState(false); // useState hook for determining if the task's title is editable

  const { updateTaskTitle, updateTaskDescription } = useChangeTask(); // Custom hook to access the ChangeTask Context

  const [editTaskTitle, setEditTaskTitle] = useState(todo.taskTitle); // useState hook for the task's title
  const [editTaskDescription, setEditTaskDescription] = useState(
    todo.description
  );

  // Function for opening the todo's modal
  function openModal() {
    setIsModalOpen(true);
    setEditTaskTitle(todoTask.taskTitle);
    setEditTaskDescription(todoTask.description);
    setIsEditEnabled(false);
  }

  // Function for closing the todo's modal
  function closeModal(e) {
    e.stopPropagation();
    setIsModalOpen(false);
    setEditTaskTitle(todoTask.taskTitle);
    setEditTaskDescription(todoTask.description);
  }

  // Function for handling the update button click in the modal
  function handleUpdateClick(e) {
    e.stopPropagation();
    setTodoTask({
      ...todo,
      taskTitle: editTaskTitle,
      description: editTaskDescription,
    });
    // console.log(editTaskTitle);
    updateTaskTitle(todo.id, editTaskTitle);
    updateTaskDescription(todo.id, editTaskDescription);
    if (isEditEnabled) {
      setIsEditEnabled(false);
    }
  }

  return (
    <div
      onClick={openModal}
      className="flex flex-col justify-center items-center m-2 w-2/3 h-12 bg-slate-600 px-8
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
          isComplete
            ? "text-gray-400 font-bold line-through"
            : "font-bold text-white"
        }`}
      >
        {todoTask.taskTitle}
      </p>
      <p
        className={`${
          isComplete
            ? "text-gray-400 line-through italic"
            : "text-gray-400 italic"
        }`}
      >
        {todoTask.description}
      </p>
      {isModalOpen && ( // Conditional rendering for the modal being open
        <TodoModal
          isComplete={isComplete}
          setIsComplete={setIsComplete}
          closeModal={closeModal}
          isEditEnabled={isEditEnabled}
          editTaskTitle={editTaskTitle}
          setEditTaskTitle={setEditTaskTitle}
          editTaskDescription={editTaskDescription}
          setEditTaskDescription={setEditTaskDescription}
          handleUpdateClick={handleUpdateClick}
          setIsEditEnabled={setIsEditEnabled}
          todoTask={todoTask}
        />
      )}
      <DeleteTaskButton id={todo.id} />
    </div>
  );
}

import React, { useMemo, useState } from "react";
import { useTodos } from "../context/TaskContext";
import { DeleteTaskButton } from "./todoTaskComponents/TaskButtons";
import TodoModal from "./todoTaskComponents/TodoModal";
import TodoCheckBox from "./todoTaskComponents/TodoCheckBox";
import { parse } from "date-fns";

/**
 * Renders a flexbox container for displaying todo tasks.
 */
export default function TodoFlexBox() {
  const { todos } = useTodos();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProperty, setFilterProperty] = useState(null);

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    switch (filterProperty) {
      case "Completed":
        filtered = filtered.filter((todo) => todo.status);
        break;
      case "Non-completed":
        filtered = filtered.filter((todo) => !todo.status);
        break;
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (todo) =>
          todo.taskTitle.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          todo.description.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [todos, filterProperty, searchQuery]);

  const sortedTodos = useMemo(() => {
    if (filterProperty === "Due Date") {
      return filteredTodos.sort(
        (a, b) =>
          parse(a.dueDate, "PP", new Date()) -
          parse(b.dueDate, "PP", new Date())
      );
    }

    return filteredTodos;
  }, [filteredTodos, filterProperty]);

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-8">
      <input
        className="px-4 py-1 rounded-full bg-slate-800"
        type="text"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        value={searchQuery}
        placeholder="Search for Task"
      />
      <select
        onChange={(e) => {
          setFilterProperty(e.target.value);
        }}
        className="select select-error px-20 max-w-xs"
      >
        <option selected>None</option>
        <option>Completed</option>
        <option>Non-completed</option>
        <option>Due Date</option>
      </select>
      {sortedTodos.map((todo) => (
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
  const [isComplete, setIsComplete] = useState(todo.status); // useState hook for the todo Object prop's status
  const [isModalOpen, setIsModalOpen] = useState(false); // useState hook for determining if the task's modal is open
  const [editTaskTitle, setEditTaskTitle] = useState(todo.taskTitle); // useState hook for editing the task's title
  const [editTaskDescription, setEditTaskDescription] = useState(
    todo.description
  ); // useState hook for editing the task's description
  const [editTaskDueDate, setEditTaskDueDate] = useState(todo.dueDate); // useState hook for editing the task's due date
  const [isEditEnabled, setIsEditEnabled] = useState(false); // useState hook for determining if the task's title is editable

  // Function for opening the todo's modal
  function openModal() {
    setIsModalOpen(true);
    setEditTaskTitle(todo.taskTitle);
    setEditTaskDescription(todo.description);
    setEditTaskDueDate(parse(todo.dueDate, "PP", new Date()));
    setIsEditEnabled(false);
  }

  // Function for closing the todo's modal
  function closeModal(e) {
    e.stopPropagation();
    setIsModalOpen(false);
    setEditTaskTitle(todo.taskTitle);
    setEditTaskDescription(todo.description);
    setEditTaskDueDate(parse(todo.dueDate, "PP", new Date()));
  }

  return (
    <div
      onClick={openModal}
      className="flex flex-col justify-center items-center m-2 w-2/3 py-2 bg-slate-600 px-8
      rounded-full shadow-md hover:shadow-2xl hover:bg-slate-700 relative"
    >
      <TodoCheckBox
        style={"absolute left-4 rounded-full checkbox checkbox-success h-5 w-5"}
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
        {todo.taskTitle}
      </p>
      <p
        className={`${
          isComplete
            ? "text-gray-400 line-through italic"
            : "text-gray-400 italic"
        }`}
      >
        {todo.description}
      </p>
      <p>{todo.dueDate}</p>
      {isModalOpen && ( // Conditional rendering for the modal being open
        <TodoModal
          isComplete={isComplete}
          setIsComplete={setIsComplete}
          closeModal={closeModal}
          isEditEnabled={isEditEnabled}
          setIsEditEnabled={setIsEditEnabled}
          editTaskTitle={editTaskTitle}
          setEditTaskTitle={setEditTaskTitle}
          editTaskDescription={editTaskDescription}
          setEditTaskDescription={setEditTaskDescription}
          editTaskDueDate={editTaskDueDate}
          setEditTaskDueDate={setEditTaskDueDate}
          todo={todo}
        />
      )}
      <DeleteTaskButton id={todo.id} />
    </div>
  );
}

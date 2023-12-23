import { useChangeTask } from "../../../context/TaskContext";

/**
 * Button component for updating a todo task
 * Disabled if the editTask prop is an empty string
 * @param {VoidFunction} handleUpdateClick - Function for handling the update button click in the modal
 * @param {string} editTask - The task title to be edited
 */
export function UpdateTaskButton({ handleUpdateClick, editTask }) {
  return (
    <button
      disabled={editTask === ""}
      onClick={handleUpdateClick}
      className={`m-3 font-bold ${
        editTask === "" ? "text-slate-400" : "text-slate-800"
      } px-2 py-0.5 rounded-xl ${
        editTask === "" ? "bg-blue-100" : "bg-blue-300"
      }`}
    >
      Update Task
    </button>
  );
}

/**
 * Button component for deleting a todo task
 * @param {string} id - The id of the todo task
 */
export function DeleteTaskButton({ id }) {
  const { deleteTask } = useChangeTask();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation(); // Prevents the delete button from being clickable if the modal is open
        deleteTask(id);
      }}
      className="absolute right-3 rounded-full p-2 text-xs"
    >
      ❌
    </button>
  );
}

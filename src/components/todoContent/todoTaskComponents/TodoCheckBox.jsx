import { useUpdateTaskStatus } from "../../../context/TaskContext";

/**
 * Checkbox component to determine the completion status of a todo
 * @param {boolean} isComplete - The completion status of the todo
 * @param {string} id - The id of the todo
 * @param {function} setIsComplete - The function to set the completion status of the todo
 * @returns
 */
export default function TodoCheckBox({ isComplete, id, setIsComplete, style }) {
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

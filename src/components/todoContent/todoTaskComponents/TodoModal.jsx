import { UpdateTaskButton } from "./TaskButtons";
import TodoCheckBox from "./TodoCheckBox";

export default function TodoModal({
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
          <p className="ml-2 italic">Added on {todoTask.currDate}</p>
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

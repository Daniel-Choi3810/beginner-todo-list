import './App.css';
import Header from './components/Header';
import TodoDisplay from './components/todoContent/TodoDisplay';
import TodoInput from './components/TodoInput';
import { TaskProvider, useChangeTask, useTask } from './context/TaskContext';

/**
 * Renders the main application component.
 * Wrapped by the TaskProvider component to provide state values to children
 */
function App() {
  return (
    <TaskProvider>
      <div className="App">
        <Header />
        <div className='w-full flex justify-center items-cente mt-8'>
          <TodoInput />
          <AddTaskButton />
        </div>
        <TodoDisplay />
      </div>
    </TaskProvider>
  );
}


/**
 * Renders a button component for adding a task.
 * Button is functional only if the task is not empty.
 */
function AddTaskButton() {
  const { task } = useTask();
  const { addTask } = useChangeTask();
  return (
    <button
      disabled={task === "" ? true : false}
      onClick={addTask}
      className={`${task === ""
        ? "bg-slate-500 opacity-40"
        : "bg-slate-500 hover:bg-slate-600"
        } font-semibold text-lg
       text-white rounded-full w-24 ml-4`}
    >
      Add
    </button>
  );
}

export default App;
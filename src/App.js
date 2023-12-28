import Header from './components/Header';
import TodoDisplay from './components/TodoDisplay';
import CreateTaskInput from './components/CreateTaskInput';
import { TaskProvider, useChangeTask, useTaskTitle } from './context/TaskContext';
import TaskCalendarPicker from './components/todoTaskComponents/TaskCalendarPicker';

/**
 * Renders the main application component.
 * Wrapped by the TaskProvider component to provide state values to children
 */

function App() {
  return (
    <TaskProvider>
      <div className="flex flex-col items-center text-center">
        <Header />
        <TodoDisplay />
        <CreateTaskInput />
      </div>
    </TaskProvider>
  );
}

export default App;
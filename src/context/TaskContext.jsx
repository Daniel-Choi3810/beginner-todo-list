import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

// These are contexts for managing different aspects of the todo application
const TodoContext = createContext(null); // Context created for todos list.
const TaskTitleContext = createContext(null); // Context created for the created task's state
const ChangeTaskContext = createContext(null); // Context created for the add, delete, and update tasks
const UpdateTaskStatusContext = createContext(null); // Context created for the update task completion status
const TodoListDispatchContext = createContext(null); // Context created for the dispatch method used with useReducer.

// Action types for useReducer to handle different actions
const ACTIONS = {
  ADD: "addTask",
  DELETE: "deleteTask",
  UPDATE_TITLE: "updateTaskTitle",
  UPDATE_STATUS: "updateTaskStatus",
};

/**
 * Context provider component that handles the state and actions for the
 * to-do application with the useReducer and useState hooks
 */
export function TaskProvider({ children }) {
  // useState hook for the newly created task's title
  const [taskTitle, setTaskTitle] = useState("");
  // useReducer hook that manages the state of the todos.  The initial state is from localStorage
  const [todos, dispatch] = useReducer(reducer, getInitialState());

  // useEffect hook updates the localStorage data when the todos state is re-rendered
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todos));
    // console.log(JSON.parse(localStorage.getItem("items")));
  }, [todos]);

  // Function to add a new task to the todos state
  function addTask() {
    dispatch({ type: ACTIONS.ADD, task: taskTitle });
    setTaskTitle(""); // Clears the task state after it is created
  }

  // Function to delete a task based off the id
  function deleteTask(id) {
    dispatch({
      type: ACTIONS.DELETE,
      id: id,
    });
  }

  // Function to update the task title based off of the id
  function updateTaskTitle(id, todoTask) {
    dispatch({
      type: ACTIONS.UPDATE_TITLE,
      id: id,
      todoTask: todoTask,
    });
  }

  // Function to update the task status based off of the id
  function updateTaskStatus(id, taskStatus) {
    dispatch({
      type: ACTIONS.UPDATE_STATUS,
      id: id,
      taskStatus: taskStatus,
    });
  }

  return (
    <TodoListDispatchContext.Provider value={dispatch}>
      <TodoContext.Provider value={{ todos }}>
        <TaskTitleContext.Provider value={{ taskTitle, setTaskTitle }}>
          <UpdateTaskStatusContext.Provider value={{ updateTaskStatus }}>
            <ChangeTaskContext.Provider
              value={{ addTask, deleteTask, updateTaskTitle }}
            >
              {children}
            </ChangeTaskContext.Provider>
          </UpdateTaskStatusContext.Provider>
        </TaskTitleContext.Provider>
      </TodoContext.Provider>
    </TodoListDispatchContext.Provider>
  );
}
// Custom hook to return the TodoContext
export function useTodos() {
  return useContext(TodoContext);
}

// Custom hook to return the TodoListDispatchContext
export function useDispatch() {
  return useContext(TodoListDispatchContext);
}

// Custom hook to return the TaskTitleContext
export function useTask() {
  return useContext(TaskTitleContext);
}

// Custom hook to return the ChangeTaskContext
export function useChangeTask() {
  return useContext(ChangeTaskContext);
}

// Custom hook to return the UpdateTaskStatusContext
export function useUpdateTaskStatus() {
  return useContext(UpdateTaskStatusContext);
}

// Variable to get the initial todos state from localStorage
const getInitialState = () => {
  const localData = localStorage.getItem("items");
  return localData ? JSON.parse(localData) : [];
};

// Reducer function to handle different actions and update the todos state
function reducer(todos, action) {
  switch (action.type) {
    // action to add task to todos
    case ACTIONS.ADD: {
      return [...todos, { id: uuidv4(), title: action.task, status: false }];
    }
    // action to delete a task from todos based off of id
    case ACTIONS.DELETE: {
      return todos.filter((e) => e.id !== action.id);
    }
    // action to update a task title in todos based off of id
    case ACTIONS.UPDATE_TITLE: {
      return todos.map((todo) => {
        if (action.id === todo.id) {
          return { ...todo, title: action.todoTask };
        } else {
          return todo;
        }
      });
    }
    // action to update a task title status in todos based off of id
    case ACTIONS.UPDATE_STATUS: {
      return todos.map((todo) => {
        if (action.id === todo.id) {
          return { ...todo, status: action.taskStatus };
        } else {
          return todo;
        }
      });
    }
    default:
      return todos;
  }
}

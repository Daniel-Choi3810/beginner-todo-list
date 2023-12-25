import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

// These are contexts for managing different aspects of the todo application
const TodoContext = createContext(null); // Context created for todos list.
const TaskContext = createContext(null); // Context created for the created task state
const ChangeTaskContext = createContext(null); // Context created for the add, delete, and update tasks
const TodoListDispatchContext = createContext(null); // Context created for the dispatch method used with useReducer.

// Action types for useReducer to handle different actions
const ACTIONS = {
  ADD: "addTask",
  DELETE: "deleteTask",
  UPDATE_TITLE: "updateTaskTitle",
  UPDATE_STATUS: "updateTaskStatus",
  UPDATE_DESCRIPTION: "updateTaskDescription",
  UPDATE_DUE_DATE: "updateTaskDueDate",
};

/**
 * Context provider component that handles the state and actions for the
 * to-do application with the useReducer and useState hooks
 */
export function TaskProvider({ children }) {
  // useState hook for the newly created task's title
  const [taskTitle, setTaskTitle] = useState("");
  // useState hook for the newly created task's description
  const [taskDescription, setTaskDescription] = useState("");
  // useState hook for the newly created task's dued date
  const [taskDueDate, setTaskDueDate] = useState("");
  // useReducer hook that manages the state of the todos.  The initial state is from localStorage
  const [todos, dispatch] = useReducer(reducer, getInitialState());

  // useEffect hook updates the localStorage data when the todos state is re-rendered
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todos));
    // console.log(JSON.parse(localStorage.getItem("items")));
  }, [todos]);

  // Function to add a new task to the todos state
  function addTask() {
    dispatch({
      type: ACTIONS.ADD,
      taskTitle: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate === "" ? "" : format(taskDueDate, "PP"), // date object in state must be formatted as string
    });
    setTaskTitle(""); // Clears the task title state after it is created
    setTaskDescription(""); // Clears the task description state after it is created
    setTaskDueDate(""); // Clears the task due date state after it is created
  }

  // Function to delete a task based off the id
  function deleteTask(id) {
    dispatch({
      type: ACTIONS.DELETE,
      id: id,
    });
  }

  // Function to update the task title based off of the id
  function updateTaskTitle(id, todoTaskTitle) {
    dispatch({
      type: ACTIONS.UPDATE_TITLE,
      id: id,
      todoTaskTitle: todoTaskTitle,
    });
  }

  function updateTaskDescription(id, todoTaskDescription) {
    dispatch({
      type: ACTIONS.UPDATE_DESCRIPTION,
      id: id,
      todoTaskDescription: todoTaskDescription,
    });
  }

  function updateTaskDueDate(id, todoTaskDueDate) {
    dispatch({
      type: ACTIONS.UPDATE_DUE_DATE,
      id: id,
      todoTaskDueDate:
        todoTaskDueDate === undefined ? "" : format(todoTaskDueDate, "PP"), // date object in state must be formatted as string
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
        <TaskContext.Provider
          value={{
            taskTitle,
            setTaskTitle,
            taskDescription,
            setTaskDescription,
            taskDueDate,
            setTaskDueDate,
          }}
        >
          <ChangeTaskContext.Provider
            value={{
              addTask,
              deleteTask,
              updateTaskTitle,
              updateTaskDescription,
              updateTaskStatus,
              updateTaskDueDate,
            }}
          >
            {children}
          </ChangeTaskContext.Provider>
        </TaskContext.Provider>
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
  return useContext(TaskContext);
}

// Custom hook to return the ChangeTaskContext
export function useChangeTask() {
  return useContext(ChangeTaskContext);
}

// Variable to get the initial todos state from localStorage
const getInitialState = () => {
  const localData = localStorage.getItem("items");
  return localData ? JSON.parse(localData) : [];
};

const getCurrDate = () => {
  const dateObj = new Date();
  const month = dateObj.getMonth() + 1; // Months are 0-indexed
  const day = dateObj.getDate(); // Get the day of the month
  let hours = dateObj.getHours(); // Get the hours
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const currDate = `${formattedMonth}/${formattedDay} · ${hours}:${formattedMinutes} ${ampm}`;
  return currDate;
};

// Reducer function to handle different actions and update the todos state
function reducer(todos, action) {
  switch (action.type) {
    // action to add task to todos
    case ACTIONS.ADD: {
      return [
        ...todos,
        {
          id: uuidv4(),
          taskTitle: action.taskTitle,
          status: false,
          currDate: getCurrDate(),
          description: action.description,
          dueDate: action.dueDate,
        },
      ];
    }
    // action to delete a task from todos based off of id
    case ACTIONS.DELETE: {
      return todos.filter((e) => e.id !== action.id);
    }
    // action to update a task title in todos based off of id
    case ACTIONS.UPDATE_TITLE: {
      return todos.map((todo) => {
        if (action.id === todo.id) {
          return { ...todo, taskTitle: action.todoTaskTitle };
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
    case ACTIONS.UPDATE_DESCRIPTION: {
      return todos.map((todo) => {
        if (action.id === todo.id) {
          return { ...todo, description: action.todoTaskDescription };
        } else {
          return todo;
        }
      });
    }
    case ACTIONS.UPDATE_DUE_DATE: {
      return todos.map((todo) => {
        if (action.id === todo.id) {
          return { ...todo, dueDate: action.todoTaskDueDate };
        } else {
          return todo;
        }
      });
    }
    default:
      return todos;
  }
}

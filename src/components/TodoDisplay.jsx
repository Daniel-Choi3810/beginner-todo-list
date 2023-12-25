import React, { useContext } from "react";
import TodoFlexBox from "./TodoFlexBox";
import { TodoListContext } from "../context/TaskContext";

/**
 *
 * To do display component that displays the todo list in a flexbox
 */
export default function TodoDisplay() {
  // const { todoList } = useContext(TodoListContext);
  return (
    <div
      className="flex flex-col justify-center
    items-center w-full relative m-8"
    >
      <TodoFlexBox />
      {/* <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title + " " + todo.status}</li>
        ))}
      </ul> */}
    </div>
  );
}

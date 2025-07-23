import React from "react";
import TodoFlexBox from "./TodoFlexBox";
import FilterButtons from "./FilterButtons";

/**
 *
 * To do display component that displays the todo list in a flexbox
 */
export default function TodoDisplay() {
  return (
    <div
      className="flex flex-col justify-center
    items-center w-full relative m-8"
    >
      <FilterButtons />
      <TodoFlexBox />
      {/* <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title + " " + todo.status}</li>
        ))}
      </ul> */}
    </div>
  );
}

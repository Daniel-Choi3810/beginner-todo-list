import React from "react";
import { useFilter } from "../../context/TaskContext";

export default function FilterButtons() {
  const { filter, setFilter } = useFilter();

  return (
    <div className="flex space-x-2 my-4">
      <button
        className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`px-3 py-1 rounded ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button
        className={`px-3 py-1 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}

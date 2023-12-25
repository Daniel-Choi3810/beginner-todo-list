import { useState } from "react";
import { format } from "date-fns";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useTask } from "../../context/TaskContext";

export default function TaskCalendarPicker() {
  const { taskDueDate, setTaskDueDate } = useTask();

  let footer = <p>Please pick a day.</p>;
  if (taskDueDate) {
    footer = <p>You picked {format(taskDueDate, "PP")}.</p>;
  }
  return (
    <DayPicker
      mode="single"
      selected={taskDueDate}
      onSelect={setTaskDueDate}
      footer={footer}
    />
  );
}

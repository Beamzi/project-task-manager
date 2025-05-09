"use client";

import React from "react";
import { useContext, useState } from "react";
import { TaskDueDateContext } from "@/context/TaskDueDateContext";
import ListOfScheduleTasks from "../Schedule/ListOfScheduleTasks";
import ScheduleTask from "../Schedule/ScheduleTask";

export default function ListOfReminderTasks() {
  const tasksByDueDate = useContext(TaskDueDateContext);
  const [overDue, isOverDue] = useState(true);

  if (!tasksByDueDate) {
    throw new Error("dueDateTasks not loaded");
  }

  console.log(tasksByDueDate, "asdasdasdd");
  return (
    <>
      <div className="scrolling-container overflow-y-scroll h-[40dvh] ">
        {tasksByDueDate?.map(
          (item) =>
            item.date < new Date() && (
              <ScheduleTask
                overDue={overDue}
                key={item.id}
                // taskId={item.id}
                title={item.title}
                date={item.date}
                content={item.content}
              ></ScheduleTask>
            )
        )}
        {tasksByDueDate?.map(
          (item) =>
            item.date > new Date() && (
              <ScheduleTask
                key={item.id}
                // taskId={item.id}
                title={item.title}
                date={item.date}
                content={item.content}
              ></ScheduleTask>
            )
        )}
      </div>
    </>
  );
}

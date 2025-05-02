"use client";

import React from "react";
import Task from "../Task";
import { format } from "date-fns";
import type { TaskType } from "@/context/TaskContext";

interface NewProps {
  currentTasks: TaskType[] | undefined;
  taskParentClasses: string;
}

export default function ListOfTasks({
  currentTasks,
  taskParentClasses,
}: NewProps) {
  return (
    <>
      {currentTasks?.map((item) => (
        <Task
          key={item.id}
          author={item.author?.name}
          title={item.title}
          date={item.date}
          content={item.content}
          id={item.id}
          priority={item.priority}
          projectId={item.projectId}
          taskParentClasses={taskParentClasses}
        ></Task>
      ))}
    </>
  );
}

/*format(new Date(item.date), "dd/MM/yyyy")


interface Props {
  currentTasks:
    | ({
        author: {
          name: string | null;
        } | null;
      } & {
        id: string;
        title: string;
        date: Date;
        content: string | null;
      })[]
    | undefined;
}*/

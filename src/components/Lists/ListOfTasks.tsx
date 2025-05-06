"use client";

import React from "react";
import Task from "../Task";
import { format } from "date-fns";
import type { TaskType } from "@/context/TaskContext";

interface NewProps {
  currentTasks: TaskType[] | undefined;
}

export default function ListOfTasks({ currentTasks }: NewProps) {
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
        ></Task>
      ))}
    </>
  );
}

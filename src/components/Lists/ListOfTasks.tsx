"use client";

import React from "react";
import Task from "../Task";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

interface NewProps {
  currentTasks: getAllTasksTypeOf[] | undefined;
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

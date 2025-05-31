"use client";

import React from "react";
import Task from "../Task";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import { useContext, useEffect, useRef } from "react";
import { DashBoardContext } from "@/context/DashBoardContext";
interface NewProps {
  currentTasks: getAllTasksTypeOf[] | undefined;
}

export default function ListOfTasks({ currentTasks }: NewProps) {
  const dashboardProps = useContext(DashBoardContext);

  if (!dashboardProps) {
    throw new Error("dashboard context not loaded");
  }

  const { newTaskValues, newTaskResponse } = dashboardProps;

  const newTaskValuesSorted = newTaskValues.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const newTaskResponseSorted = newTaskResponse?.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      {newTaskValuesSorted.map((item, index) => (
        <Task
          key={item.title}
          title={item.title}
          date={item.date}
          content={item.content}
          priority={newTaskResponseSorted[index]?.priority}
          id={newTaskResponseSorted[index]?.id}
          projectId={newTaskResponseSorted[index]?.projectId}
        ></Task>
      ))}

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

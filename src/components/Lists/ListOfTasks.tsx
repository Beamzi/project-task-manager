"use client";

import React from "react";
import Task from "../Task";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import { useContext, useEffect, useRef } from "react";
import { DashBoardContext } from "@/context/DashBoardContext";
import { TaskContext } from "@/context/TaskContext";

interface NewProps {
  currentTasks: getAllTasksTypeOf[] | undefined;
  currentTasksInbox?: getAllTasksTypeOf[];
}

export default function ListOfTasks({ currentTasks }: NewProps) {
  // const dashboardProps = useContext(DashBoardContext);
  // if (!dashboardProps) {
  //   throw new Error("dashboard context not loaded");
  // }
  // const { newTaskValues } = dashboardProps;

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) {
    throw new Error("task context not loaded");
  }
  const { allTasksClient, setAllTasksClient } = tasksContext;

  return (
    <>
      {allTasksClient.map((item, index) => (
        <Task
          key={item.id}
          title={item.title}
          date={item.date}
          content={item.content}
          priority={item?.priority}
          id={item.id}
          projectId={item?.projectId}
          setAllTasksClient={setAllTasksClient}
        ></Task>
      ))}
    </>
  );
}

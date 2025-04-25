"use client";

import { TaskContext } from "@/context/TaskContext";
import React, { useContext } from "react";
import ListOfTasks from "./Lists/ListOfTasks";
import { DashBoardContext } from "@/context/DashBoardContext";

export default function AllTasks() {
  const tasks = useContext(TaskContext);
  const dashboardProps = useContext(DashBoardContext);

  const { taskParentClasses } = dashboardProps;

  return (
    <>
      <ListOfTasks
        currentTasks={tasks}
        taskParentClasses={taskParentClasses}
      ></ListOfTasks>
    </>
  );
}

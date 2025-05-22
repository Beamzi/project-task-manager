"use client";

import { TaskContext } from "@/context/TaskContext";
import React, { useContext } from "react";
import ListOfTasks from "./Lists/ListOfTasks";
import { DashBoardContext } from "@/context/DashBoardContext";

export default function AllTasks() {
  const tasks = useContext(TaskContext);

  return (
    <>
      <ListOfTasks currentTasks={tasks}></ListOfTasks>
    </>
  );
}

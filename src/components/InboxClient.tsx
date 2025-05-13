"use client";

import React from "react";
import { useState } from "react";
import FirstRowContainers from "./Skeleton/FirstRowContainers";
import SortByButtons from "./buttons/SortByButtons";
import ListOfTasks from "./Lists/ListOfTasks";
import { TasksForSorting } from "@/app/inbox/page";

interface Props {
  tasks: TasksForSorting[];
}

export default function InboxClient({ tasks }: Props) {
  const [action, setAction] = useState("");

  const orderBy = (action: String, tasks: Props["tasks"]) => {
    const tasksCopy = [...tasks];
    switch (action) {
      case "dateDesc":
        return tasksCopy.sort((a, b) => a.date.getTime() - b.date.getTime());
      case "dateAsc":
        return tasksCopy.sort((a, b) => b.date.getTime() - a.date.getTime());
      default:
        return tasksCopy;
    }
  };
  return (
    <>
      <FirstRowContainers
        leftData={<ListOfTasks currentTasks={orderBy(action, tasks)} />}
        rightData={<SortByButtons setAction={setAction} />}
        leftTitle="All Tasks"
        rightTitle="????"
      ></FirstRowContainers>
    </>
  );
}

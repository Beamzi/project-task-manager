"use client";

import React, { useEffect } from "react";
import { useState, useRef, useContext } from "react";
import FirstRowContainers from "./Skeleton/FirstRowContainers";
import SortByButtons from "./buttons/SortByButtons";
import ListOfTasks from "./Lists/ListOfTasks";
import ListOfSearchTasks from "./Lists/ListOfSearchTasks";
import SearchClient from "./SearchClient";
import { DashBoardContext } from "@/context/DashBoardContext";

import { GetAllTasksByDueDateTypeOf } from "@/lib/queries/getAllTasksByDueDate";
import { TaskContext } from "@/context/TaskContext";
import TopBarContainer from "./Skeleton/TopBarContainer";

interface Props {
  tasks: GetAllTasksByDueDateTypeOf[];
}

export default function InboxClient({ tasks }: Props) {
  const tasksContext = useContext(TaskContext);
  if (!tasksContext) {
    throw new Error("task context not loaded");
  }
  const { allTasksClient, setAllTasksClient } = tasksContext;

  const [action, setAction] = useState("");
  const [typeInterpolate, setTypeInterpolate] = useState<
    "title" | "content" | "date" | "createdAt" | "priority"
  >("date");
  const [searching, setSearching] = useState("");

  const orderBy = (
    action: string,
    typeInterpolate: "title" | "content" | "date" | "createdAt" | "priority",
    tasks: Props["tasks"]
  ) => {
    const tasksCopy = [...tasks];
    // const tasksCopy = copy.concat(newTaskResponse);

    //just be aware of any type here
    if (action === "desc")
      tasksCopy.sort((a, b) =>
        typeInterpolate === "title" || typeInterpolate === "content"
          ? //for string coercing null to string
            (b[`${typeInterpolate}`] ?? "").localeCompare(
              a[`${typeInterpolate}`] ?? ""
            )
          : // for number or boolean
            (b[`${typeInterpolate}`] as any) - (a[`${typeInterpolate}`] as any)
      );
    else
      tasksCopy.sort((a, b) =>
        typeInterpolate === "title" || typeInterpolate === "content"
          ? (a[`${typeInterpolate}`] ?? "").localeCompare(
              b[`${typeInterpolate}`] ?? ""
            )
          : (a[`${typeInterpolate}`] as any) - (b[`${typeInterpolate}`] as any)
      );

    return tasksCopy;
  };

  const tasksCopy = orderBy(action, typeInterpolate, allTasksClient);

  // const finalCopy = tasksCopy.concat(newTaskResponse);

  return (
    <>
      <SearchClient
        searching={searching}
        setSearching={setSearching}
        autoFocus={false}
        title="Inbox"
      />
      <FirstRowContainers
        leftData={
          searching.length > 0 ? (
            <ListOfSearchTasks
              allTasksClientCopy={tasksCopy}
              setAllTasksClient={setAllTasksClient}
              searching={searching}
            />
          ) : (
            <ListOfTasks
              allTasksClientCopy={tasksCopy}
              setAllTasksClient={setAllTasksClient}
            />
          )
        }
        height="h-full"
        leftWidth="w-6/2 xl:w-6/2"
        ifBottomRow={true}
        rightScrollYDisable={true}
        noExpand={true}
        rightData={
          <SortByButtons
            setAction={setAction}
            setTypeInterpolate={setTypeInterpolate}
          />
        }
      ></FirstRowContainers>
    </>
  );
}

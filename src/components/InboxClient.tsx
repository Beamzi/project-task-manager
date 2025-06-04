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
      <div className="w-full px-[clamp(16px,2vw,24px)] 2xl:w-[70%] xl:w-[80%]">
        <h3 className="px-2 text-[clamp(20px,2vw,24px)] border-b-1 border-dotted">
          Inbox
        </h3>
      </div>

      <SearchClient
        searching={searching}
        setSearching={setSearching}
        autoFocus={false}
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
        leftWidth="w-4/2 xl:w-6/2"
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

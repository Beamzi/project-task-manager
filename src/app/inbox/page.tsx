"use client";

import React from "react";
import { useState, useContext } from "react";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import SortByButtons from "@/components/buttons/SortByButtons";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import ListOfSearchTasks from "@/components/Lists/ListOfSearchTasks";
import SearchClient from "@/components/SearchClient";
import { TaskContext } from "@/context/TaskContext";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

export default function InboxClient() {
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
    tasks: getAllTasksTypeOf[]
  ) => {
    const tasksCopy = [...tasks];

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

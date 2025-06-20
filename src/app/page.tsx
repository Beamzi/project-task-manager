"use client";

import React from "react";
import ListOfReminderTasks from "@/components/Lists/ListOfReminderTasks";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import { SessionContext } from "@/context/SessionContext";
import TopBarBtns from "@/components/buttons/TopBarBtns";

export default function Overview() {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("session not loaded");
  }

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) {
    throw new Error("task context not loaded");
  }
  const { allTasksClient, setAllTasksClient } = tasksContext;
  const allTasksClientCreatedAt = [...allTasksClient];

  allTasksClientCreatedAt.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <>
      <TopBarBtns />
      <FirstRowContainers
        leftData={
          <ListOfTasks
            allTasksClientCopy={allTasksClientCreatedAt}
            setAllTasksClient={setAllTasksClient}
          ></ListOfTasks>
        }
        rightData={<ListOfReminderTasks />}
        height={`h-full`}
      ></FirstRowContainers>
    </>
  );
}

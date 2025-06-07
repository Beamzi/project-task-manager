"use client";

import React from "react";
import ListOfReminderTasks from "@/components/Lists/ListOfReminderTasks";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import SingleContainer from "@/components/Skeleton/SingleContainer";
import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import { SessionContext } from "@/context/SessionContext";
import OverviewThreeSection from "@/components/OverviewThreeSection";
import ThreeSection from "../Skeleton/ThreeSection";

export default function Overview() {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("session not loaded");
  }

  const userName = session?.user?.name;
  const firstNameOfUser = userName?.substring(0, userName?.indexOf(" "));

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) {
    throw new Error("task context not loaded");
  }
  const { allTasksClient, setAllTasksClient } = tasksContext;

  const allTasksClientCreatedAt = [...allTasksClient];

  allTasksClientCreatedAt.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
  // h-[50vh]
  return (
    <>
      <FirstRowContainers
        leftData={
          <ListOfTasks
            allTasksClientCopy={allTasksClientCreatedAt}
            setAllTasksClient={setAllTasksClient}
          ></ListOfTasks>
        }
        rightData={<ListOfReminderTasks />}
        leftTitle="Recently Created"
        rightTitle="Reminders"
        height="h-[50dvh] custom-height-media"
      ></FirstRowContainers>

      <OverviewThreeSection />
    </>
  );
}

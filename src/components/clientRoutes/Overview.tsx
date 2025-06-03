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

export default function Overview() {
  const tasks = useContext(TaskContext);

  if (!tasks) {
    throw new Error("tasks not loaded ");
  }
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("session not loaded");
  }

  const userName = session?.user?.name;
  const firstNameOfUser = userName?.substring(0, userName?.indexOf(" "));

  return (
    <>
      <FirstRowContainers
        leftData={<ListOfTasks currentTasks={tasks}></ListOfTasks>}
        rightData={<ListOfReminderTasks />}
        leftTitle="Recently Created"
        rightTitle="Reminders"
        height="h-[50dvh]"
      ></FirstRowContainers>

      <SingleContainer data={<OverviewThreeSection />} height="h-full" />
    </>
  );
}

"use client";

import React, { useContext } from "react";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import PersonalNotes from "@/components/PersonalNotes";
import { CommentsNonProjectContext } from "@/context/CommentsNonProjectsContext";
import { SessionContext } from "@/context/SessionContext";
import { TaskContext } from "@/context/TaskContext";
import { LuTimerReset } from "react-icons/lu";
import TopBarContainer from "@/components/Skeleton/TopBarContainer";

export default function Priorities() {
  const tasksContext = useContext(TaskContext);
  const comments = useContext(CommentsNonProjectContext);
  const session = useContext(SessionContext);

  if (!tasksContext || !comments || !session) {
    throw new Error("context not loaded - priorities ");
  }

  const { setAllTasksClient, allTasksClient } = tasksContext;
  const allTasksClientCopy = [...allTasksClient];

  const priorityFilter = allTasksClientCopy.filter(
    (item) => item.priority === true
  );

  return (
    <>
      <TopBarContainer
        title="Priority Tasks & Notes"
        data={
          <button className=" flex flex-col justify-center items-center h-full border-1 p-1 rounded-md ml-1">
            <LuTimerReset className="w-full h-6" />
          </button>
        }
      />
      <FirstRowContainers
        rightId={true}
        leftData={
          <ListOfTasks
            isPriority={true}
            allTasksClientCopy={priorityFilter}
            setAllTasksClient={setAllTasksClient}
          ></ListOfTasks>
        }
        rightData={
          <PersonalNotes
            // comments={comments}
            profileImg={session?.user?.image}
            name={session?.user?.name}
          />
        }
        height="h-full"
        ifBottomRow={true}
        // leftTitle="Priority Tasks"
        // rightTitle="Personal Notes"
      ></FirstRowContainers>
    </>
  );
}

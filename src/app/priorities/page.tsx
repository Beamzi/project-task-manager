"use client";

import React, { useContext } from "react";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import PersonalNotes from "@/components/PersonalNotes";
import { CommentsNonProjectContext } from "@/context/CommentsNonProjectsContext";
import { SessionContext } from "@/context/SessionContext";
import { TaskContext } from "@/context/TaskContext";

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
      <FirstRowContainers
        rightId={true}
        leftData={
          <ListOfTasks
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
        leftTitle="Priority Tasks"
        rightTitle="Personal Notes"
      ></FirstRowContainers>
    </>
  );
}

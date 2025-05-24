"use client";

import React, { useContext } from "react";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import PersonalNotes from "@/components/PersonalNotes";
import { PrioritiesContext } from "@/context/PrioritiesContext";
import { CommentsNonProjectContext } from "@/context/CommentsNonProjectsContext";
import { SessionContext } from "@/context/SessionContext";

export default function Priorities() {
  const priorityTasks = useContext(PrioritiesContext);
  const comments = useContext(CommentsNonProjectContext);
  const session = useContext(SessionContext);

  if (!priorityTasks || !comments || !session) {
    throw new Error("context not loaded - priorities ");
  }

  return (
    <>
      <FirstRowContainers
        rightId={true}
        leftData={<ListOfTasks currentTasks={priorityTasks}></ListOfTasks>}
        rightData={
          <PersonalNotes
            comments={comments}
            profileImg={session?.user?.image}
            name={session?.user?.name}
          />
        }
        leftTitle="Prioritised"
        rightTitle="Personal Notes"
      ></FirstRowContainers>
    </>
  );
}

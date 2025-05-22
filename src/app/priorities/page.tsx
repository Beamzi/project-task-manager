import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import PersonalNotes from "@/components/PersonalNotes";

async function getPriorities() {
  const session = await auth();
  if (session) {
    const priorityTasks = await prisma.task.findMany({
      where: {
        author: {
          id: session?.user?.id,
        },
        priority: true,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return priorityTasks;
  } else return [];
}

async function getNonProjectComments() {
  const session = await auth();
  if (session) {
    const comments = await prisma.comments.findMany({
      where: {
        author: { id: session?.user?.id },
        projectId: null,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return comments;
  } else return [];
}

export default async function Priorities() {
  const priorityTasks = await getPriorities();
  const comments = await getNonProjectComments();
  const session = await auth();

  return (
    <>
      <FirstRowContainers
        leftData={<ListOfTasks currentTasks={priorityTasks}></ListOfTasks>}
        rightData={
          <PersonalNotes
            comments={comments}
            profileImg={session?.user?.image}
            name={session?.user?.name}
          />
        }
        leftTitle="Prioritised"
        rightTitle="personal Notes"
      ></FirstRowContainers>
    </>
  );
}

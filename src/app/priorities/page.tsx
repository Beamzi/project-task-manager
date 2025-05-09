import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import ListOfReminderTasks from "@/components/Lists/ListOfReminderTasks";

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

export default async function Priorities() {
  const priorityTasks = await getPriorities();
  console.log(priorityTasks);
  //   <ListOfTasks currentTasks={priorityTasks}></ListOfTasks>{" "}

  return (
    <>
      <FirstRowContainers
        leftData={<ListOfTasks currentTasks={priorityTasks}></ListOfTasks>}
        rightData={<ListOfReminderTasks />}
        leftTitle="Prioritised"
        rightTitle="personal Notes"
      ></FirstRowContainers>
    </>
  );
}

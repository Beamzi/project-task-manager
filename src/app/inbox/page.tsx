import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import ListOfReminderTasks from "@/components/Lists/ListOfReminderTasks";

async function getTasksMostRecent() {
  const session = await auth();
  if (session) {
    const tasks = await prisma.task.findMany({
      where: {
        author: { id: session?.user?.id },
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return tasks;
  } else return [];
}

export default async function Inbox() {
  const tasks = await getTasksMostRecent();

  return (
    <>
      <>
        <FirstRowContainers
          leftData={<ListOfTasks currentTasks={tasks} />}
          rightData={<ListOfReminderTasks />}
          leftTitle="All Tasks"
          rightTitle="????"
        ></FirstRowContainers>
      </>
    </>
  );
}

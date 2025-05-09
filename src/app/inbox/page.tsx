import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import ListOfTasks from "@/components/Lists/ListOfTasks";

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
      <div className="flex px-6 relative bg-transparent  justify-center">
        <div className="border-1 border-dotted w-1/2 bg-neutral-900">
          <p className="px-2 py-2">All Tasks </p>
          <div
            id="task-scroll-container"
            className=" border-t-1 border-dotted bg-neutral-800 flex justify-center w-full relative flex-wrap overflow-y-scroll h-[40dvh]"
          >
            <ListOfTasks currentTasks={tasks} />
          </div>
        </div>

        <div className="w-1/2 flex flex-col border-1 border-dotted ml-6 dark:bg-neutral-900">
          <p className="border-b-1 border-dotted px-2 py-2">Reminders </p>
          <div className="dark:bg-neutral-800 h-full w-full">
            {/* <ListOfReminderTasks /> */}
          </div>
        </div>
      </div>
    </>
  );
}

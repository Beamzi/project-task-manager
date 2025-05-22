import { prisma } from "@/lib/prisma";
import React from "react";
import { auth } from "../../auth";

import ListOfReminderTasks from "@/components/Lists/ListOfReminderTasks";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import SingleContainer from "@/components/Skeleton/SingleContainer";

async function getTasks() {
  const session = await auth();
  let empty: [] = [];
  if (session) {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        author: { id: session?.user?.id },
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return tasks;
  } else {
    return empty;
  }
}

export default async function AllTasksView() {
  const session = await auth();
  const tasks = await getTasks();

  const userName = session?.user?.name;
  const firstNameOfUser = userName?.substring(0, userName?.indexOf(" "));

  return (
    <>
      <div className="break-words px-5 py-3 absolute top-20 right-10 bg-black border-1 rounded-xl w-60  flex content-center items-center align-middle  flex-shrink-0 justify-start  ">
        <h2 className=" text-[clamp(1rem,2dvh,1.5rem)]">
          {tasks[0]
            ? `Welcome Back, ${firstNameOfUser}, You have 12 active projects `
            : `Welcome, ${firstNameOfUser}, Click 'New Project or create task to get started! `}
        </h2>
      </div>

      <FirstRowContainers
        leftData={<ListOfTasks currentTasks={tasks}></ListOfTasks>}
        rightData={<ListOfReminderTasks />}
        leftTitle="Recently Created"
        rightTitle="Reminders"
        height="h-[50dvh] "
      ></FirstRowContainers>

      <SingleContainer
        data={<ListOfTasks currentTasks={tasks} />}
        height="h-full"
      />
    </>
  );
}

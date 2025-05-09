import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import ListOfScheduleTasks from "@/components/Schedule/ListOfScheduleTasks";
import ScheduleMenu from "@/components/Schedule/ScheduleMenu";
async function getTasksByDueDate() {
  const session = await auth();
  if (session) {
    const result = await prisma.task.findMany({
      orderBy: {
        date: "asc",
      },
      where: {
        author: { id: session?.user?.id },
      },
    });
    return result;
  }
}

export default async function Schedule() {
  const result = await getTasksByDueDate();
  console.log({ result });

  return (
    <div className="border-x-1 border-b-1 m-6 ">
      <div className="">
        <ScheduleMenu scheduleTasks={result} />
      </div>

      <div className="scrolling-container overflow-y-scroll h-[70dvh] w-full ">
        <ListOfScheduleTasks scheduleTasks={result} />
      </div>
    </div>
  );
}

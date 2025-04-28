import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import ListOfScheduleTasks from "@/components/Lists/ListOfScheduleTasks";
import ScheduleMenu from "@/components/ScheduleMenu";
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
    <div>
      <div className="overflow-x-scroll">
        <ScheduleMenu scheduleTasks={result} />
      </div>

      <div className="overflow-y-scroll border-2 h-[70dvh] w-[70wvh] ">
        <ListOfScheduleTasks scheduleTasks={result} />
      </div>
    </div>
  );
}

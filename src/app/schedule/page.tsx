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
      <ScheduleMenu scheduleTasks={result} />

      <div className="overflow-y-scroll border-2 h-[80dvh] w-[80wvh]">
        <ListOfScheduleTasks scheduleTasks={result} />
      </div>
    </div>
  );
}

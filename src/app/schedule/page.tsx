"use client";
import React from "react";

import ListOfScheduleTasks from "@/components/Schedule/ListOfScheduleTasks";
import ScheduleMenu from "@/components/Schedule/ScheduleMenu";
import { useContext } from "react";
import { AllTasksDueDateContext } from "@/context/AllTasksDueDateContext";

// async function getTasksByDueDate() {
//   const session = await auth();
//   if (session) {
//     const result = await prisma.task.findMany({
//       orderBy: {
//         date: "asc",
//       },
//       where: {
//         author: { id: session?.user?.id },
//       },
//     });
//     return result;
//   }
// }

export default function Schedule() {
  const allTasksByDueDate = useContext(AllTasksDueDateContext);

  // const result = await getTasksByDueDate();

  return (
    <div className="border-x-1 border-b-1 m-6 ">
      <div className="">
        <ScheduleMenu scheduleTasks={allTasksByDueDate} />
      </div>

      <div className="scrolling-container overflow-y-scroll h-[70dvh] w-full ">
        <ListOfScheduleTasks scheduleTasks={allTasksByDueDate} />
      </div>
    </div>
  );
}

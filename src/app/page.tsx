import AllTasks from "@/components/AllTasks";
import TasksProvider from "@/components/TasksProvider";
import { prisma } from "@/lib/prisma";
import React from "react";

async function getTasks() {
  const tasks = await prisma.task.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return tasks;
}

export default async function AllTasksView() {
  const tasks = await getTasks();
  console.log(tasks);
  return (
    <TasksProvider tasks={tasks}>
      <main className="border-2 p-5 ml-5 w-[80%]">
        <div>THIS IS TASK VIEW PAGE</div>
        <AllTasks></AllTasks>
      </main>
    </TasksProvider>
  );
}

/*    <ClientWrapper tasks={tasks}>i
      <div>THIS IS TASK VIEW PAGE</dv>
    </ClientWrapper>*/

import AllTasks from "@/components/AllTasks";
import SignInBtn from "@/components/buttons/SignInBtn";
import TasksProvider from "@/components/TasksProvider";
import { prisma } from "@/lib/prisma";
import React from "react";
import { auth } from "../../auth";
import { SignOutBtn } from "@/components/buttons/SignOutBtn";

async function getTasks() {
  const session = await auth();
  let empty: [] = [];
  if (session) {
    const tasks = await prisma.task.findMany({
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
  console.log({ session });
  const tasks = await getTasks();
  console.log(tasks);
  return (
    <TasksProvider tasks={tasks}>
      <main className="border-2 p-5 ml-5 w-[80%]">
        <div>THIS IS TASK VIEW PAGE</div>
        <SignInBtn></SignInBtn>
        <SignOutBtn></SignOutBtn>
        <AllTasks></AllTasks>
      </main>
    </TasksProvider>
  );
}

/*    <ClientWrapper tasks={tasks}>i
      <div>THIS IS TASK VIEW PAGE</dv>
    </ClientWrapper>*/

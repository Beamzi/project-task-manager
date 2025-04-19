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
  const result = await prisma.$queryRaw`
  SELECT 
    table_name,
    pg_size_pretty(pg_total_relation_size(quote_ident(table_name))) as size
  FROM information_schema.tables
  WHERE table_schema = 'public'
  ORDER BY pg_total_relation_size(quote_ident(table_name)) DESC;
`;

  //console.log(result);
  const session = await auth();
  //console.log({ session });
  const tasks = await getTasks();
  //console.log(tasks);
  return (
    <TasksProvider tasks={tasks}>
      <div className="bg-transparent py-5 pb-10">All Tasks.</div>
      <div className="noise-overlay sm:flex sm:flex-wrap sm:justify-between sm:w-[100%] w-[70dvw]">
        <AllTasks></AllTasks>
      </div>
    </TasksProvider>
  );
}

/*    <ClientWrapper tasks={tasks}>i
      <div>THIS IS TASK VIEW PAGE</dv>
    </ClientWrapper>*/

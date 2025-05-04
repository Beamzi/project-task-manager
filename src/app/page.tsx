import AllTasks from "@/components/AllTasks";
import SignInBtn from "@/components/buttons/SignInBtn";
import TasksProvider from "@/components/TasksProvider";
import { prisma } from "@/lib/prisma";
import React from "react";
import { auth } from "../../auth";
import { SignOutBtn } from "@/components/buttons/SignOutBtn";
import EasySelect from "@/components/Lists/EasySelect";
import EasySelectAdapter from "@/components/EasySelectAdapter";
import { format } from "date-fns";
import ListOfReminderTasks from "@/components/Lists/ListOfReminderTasks";

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
  const session = await auth();
  const tasks = await getTasks();

  const userName = session?.user?.name;
  const firstNameOfUser = userName?.substring(0, userName?.indexOf(" "));

  console.log(session?.user?.name);

  return (
    <TasksProvider tasks={tasks}>
      <div className="px-5 py-6 flex justify-start bg-transparent ">
        <h3 className="text-start text-lg min-w-50">
          {tasks[0]
            ? `Welcome Back, ${firstNameOfUser}`
            : `Welcome, ${firstNameOfUser}`}
        </h3>
        <div className="border-b-1 border-dotted relative bottom-1.5 outline-white w-full"></div>
        <p className="min-w-60 text-lg text-right">
          You have 12 active projects
        </p>
      </div>
      <div className="flex px-6 relative bg-transparent  justify-center">
        <div className="border-1 border-dotted w-1/2 bg-neutral-900">
          <p className="px-2 py-2">Recently Created </p>
          <div
            id="task-scroll-container"
            className=" border-t-1 border-dotted bg-neutral-900 flex justify-center w-full relative flex-wrap overflow-y-scroll h-[40dvh]"
          >
            <div className="OVERLAY task-scroll-shadow h-0 sticky top-0 z-10 left-0 w-[100%]"></div>
            <AllTasks></AllTasks>
          </div>
        </div>
        <div className="w-1/2 flex flex-col border-1 border-dotted ml-6 dark:bg-neutral-900">
          <p className="border-b-1 border-dotted px-2 py-2 ">Reminders </p>
          <ListOfReminderTasks />
        </div>
      </div>

      <div className=" flex px-6 pt-6 relative bg-transparent  justify-center ">
        <div className="border-1 border-dotted w-2/2 bg-neutral-900">
          <p className="px-2 py-2">Priorities </p>
          <div
            id="task-scroll-container"
            className=" border-t-1 border-dotted bg-neutral-900 flex justify-center w-full relative flex-wrap overflow-y-scroll h-[27dvh]"
          >
            <div className="OVERLAY task-scroll-shadow h-0 sticky top-0 z-10 left-0 w-[100%]"></div>
            <AllTasks></AllTasks>
          </div>
        </div>
      </div>
    </TasksProvider>
  );
}

/* <div className="flex border-1 ml-4">
          <EasySelect modelList={tasks} />
        </div> */
// bg-linear-0 from-rose-900 to-neutral-900
/*    <ClientWrapper tasks={tasks}>i
      <div>THIS IS TASK VIEW PAGE</dv>
    </ClientWrapper>*/

//xl:max-w-200 md:max-w-130 lg:max-w-150

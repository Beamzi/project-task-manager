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
      {/* <div className="bg-transparent py-2 pb-5 border-2"></div> */}
      <div className=" py-5 px-3 flex flex-col justify-start w-full  bg-transparent ">
        <h3 className="text-start w-full">Quickview</h3>
        <hr className="w-full mt-2 opacity-40"></hr>
      </div>

      <div className="inner-background flex border-1 py-4 px-4 relative bg-transparent  justify-center ">
        <div className="border-1 bg-neutral-900">
          <p className="px-2 py-2">Recently Created </p>
          <div
            id="task-scroll-container"
            className="border-r-1 border-y-1 bg-neutral-900 flex justify-center xl:max-w-200 md:max-w-130 lg:max-w-150 relative flex-wrap overflow-y-scroll h-[70dvh]"
          >
            <div className="OVERLAY task-scroll-shadow h-0 sticky top-0 z-10 left-0 w-[100%]"></div>
            <AllTasks></AllTasks>
          </div>
        </div>
        <div className="flex border-1 ml-4">
          <EasySelect modelList={tasks} />
        </div>
      </div>
    </TasksProvider>
  );
}

// bg-linear-0 from-rose-900 to-neutral-900
/*    <ClientWrapper tasks={tasks}>i
      <div>THIS IS TASK VIEW PAGE</dv>
    </ClientWrapper>*/

import { Suspense } from "react";
import AllTasks from "@/components/AllTasks";
import SignInBtn from "@/components/buttons/SignInBtn";
import TasksProvider from "@/components/Providers/tasksProviders/TasksProvider";
import { prisma } from "@/lib/prisma";
import { auth } from "../../auth";
import { SignOutBtn } from "@/components/buttons/SignOutBtn";
import EasySelect from "@/components/Lists/EasySelect";
import EasySelectAdapter from "@/components/EasySelectAdapter";
import { format } from "date-fns";
import ListOfReminderTasks from "@/components/Lists/ListOfReminderTasks";
import ListOfTasks from "@/components/Lists/ListOfTasks";

// Create an async function that suspends the fetching of data
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

async function fetchData() {
  const tasks = await getTasks();
  return tasks;
}

// Suspense boundary component
function SuspendedAllTasksView() {
  const tasks = fetchData(); // This will suspend until data is fetched

  return (
    <div className="px-5 py-6 flex justify-start bg-transparent">
      <h2 className="text-start min-w-45">
        {tasks[0] ? `Welcome Back, ${tasks[0]?.author?.name}` : `Welcome`}
      </h2>
      <div className="border-b-1 border-dotted relative bottom-1.5 outline-white w-full"></div>
      <h2 className="min-w-53 text-right">You have 12 active projects</h2>
    </div>
  );
}

export default function AllTasksView() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {" "}
      {/* Fallback for Suspense */}
      <SuspendedAllTasksView />
      <div className="flex px-6 relative bg-transparent justify-center">
        <div className="border-1 border-dotted w-1/2 bg-neutral-900">
          <p className="px-2 py-2">Recently Created</p>
          <div
            id="task-scroll-container"
            className="border-t-1 border-dotted bg-neutral-900 flex justify-center w-full relative flex-wrap overflow-y-scroll h-[40dvh]"
          >
            <div className="OVERLAY task-scroll-shadow h-0 sticky top-0 z-10 left-0 w-[100%]"></div>
            <ListOfTasks currentTasks={[]} /> {/* Temporary empty task */}
          </div>
        </div>
        <div className="w-1/2 flex flex-col border-1 border-dotted ml-6 dark:bg-neutral-900">
          <p className="border-b-1 border-dotted px-2 py-2">Reminders</p>
          <ListOfReminderTasks />
        </div>
      </div>
      <div className="flex px-6 pt-6 relative bg-transparent justify-center">
        <div className="border-1 border-dotted w-2/2 bg-neutral-900">
          <p className="px-2 py-2">Priorities</p>
          <div
            id="task-scroll-container"
            className="border-t-1 border-dotted bg-neutral-900 flex justify-center w-full relative flex-wrap overflow-y-scroll h-[27dvh]"
          >
            <div className="OVERLAY task-scroll-shadow h-0 sticky top-0 z-10 left-0 w-[100%]"></div>
            <ListOfTasks currentTasks={[]} /> {/* Temporary empty task */}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

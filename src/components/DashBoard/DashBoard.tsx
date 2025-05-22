import SideBar from "./SideBar";
import { DashBoardProvider } from "../DashBoardProvider";
import DashBoardOverlay from "./DashBoardOverlay";
import { ProjectProvider } from "../ProjectProvider";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import { TaskDueDateProvider } from "../TaskDueDateProvider";

import MobileHeader from "./MobileHeader";
import TopBar from "./TopBar";

async function getProjects() {
  const session = await auth();

  const projects = await prisma.project.findMany({
    where: { author: { id: session?.user?.id } },
    select: {
      title: true,
      id: true,
    },
  });
  return projects;
}

async function getTasksByDueDate() {
  const session = await auth();

  if (session) {
    const result = await prisma.task.findMany({
      where: { author: { id: session?.user?.id } },
      orderBy: {
        date: "asc",
      },
      select: {
        title: true,
        id: true,
        date: true,
        content: true,
      },
    });
    return result;
  } else return [];
}

export default async function DashBoard({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();
  const tasksByDueDate = await getTasksByDueDate();

  return (
    <DashBoardProvider>
      <TaskDueDateProvider value={tasksByDueDate}>
        <ProjectProvider value={projects}>
          <DashBoardOverlay />
          <div className="box-border h-screen md:p-5  overflow-hidden flex flex-col ">
            <MobileHeader className=" md:hidden small-menu  h-20 w-full border-b-1 sticky top-0 z-3"></MobileHeader>
            <TopBar className="z-2 gradient-for-thin-containers  invisible relative md:h-12 h-0 md:border-y-1 w-full md:visible"></TopBar>
            <div className=" flex flex-1 overflow-hidden justify-center  w-full h-full">
              <SideBar className=" gradient-for-vert-containers   min-w-45  xl:max-w-50 md:visible invisible flex flex-col px-1 py-2 border-l-1 border-b-1 md:relative fixed h-full left-0 md:top-0" />
              <main className="gradient-for-main flex flex-col h-full flex-1 min-h-0 items-center  border-x-1 border-b-1 py-[clamp(16px,10vw,50px)] w-vw dark:bg-neutral-950 w-full">
                {children}
              </main>
            </div>
          </div>
        </ProjectProvider>
      </TaskDueDateProvider>
    </DashBoardProvider>
  );
}

import SideBar from "./SideBar";
import { DashBoardProvider } from "../Providers/DashBoardProvider";
import { ProjectProvider } from "../Providers/ProjectProvider";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import AllProjectsProvider from "../Providers/AllProjectsProvider";
import { getAllProjects } from "@/lib/queries/getAllProjects";
import CurrentSessionProvider from "../Providers/CurrentSessionProvider";
import { getAllTasks } from "@/lib/queries/getAllTasks";
import { getAllTasksByDueDate } from "@/lib/queries/getAllTasksByDueDate";
import TasksProviderGroup from "../Providers/tasksProviders/TasksProviderGroup";
import CommentsNonProjectProvider from "../Providers/CommentsNonProjectProvider";
import { getNonProjectComments } from "@/lib/queries/getNonProjectComments";
import PrioritiesProvider from "../Providers/PrioritiesProvider";
import { getPriorities } from "@/lib/queries/getPriorities";
import MobileHeader from "./MobileHeader";
import TopBar from "./TopBar";
import AllCommentsProvider from "../Providers/AllCommentsProvider";
import getAllComments from "@/lib/queries/getAllComments";

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
  const allTasksByDueDate = await getAllTasksByDueDate();
  const tasksByDueDate = await getTasksByDueDate();
  const allTasks = await getAllTasks();
  const comments = await getNonProjectComments();
  const priorities = await getPriorities();
  const allProjects = await getAllProjects();
  const session = await auth();
  const allComments = await getAllComments();

  return (
    // <TasksProvider allTasks={allTasks}>
    <DashBoardProvider allTasks={allTasks}>
      <CurrentSessionProvider value={session}>
        <AllProjectsProvider allProjects={allProjects}>
          <ProjectProvider value={projects}>
            <TasksProviderGroup
              tasksByDueDate={tasksByDueDate}
              allTasksByDueDate={allTasksByDueDate}
              allTasks={allTasks}
            >
              <AllCommentsProvider allComments={allComments}>
                <CommentsNonProjectProvider comments={comments}>
                  <PrioritiesProvider priorities={priorities}>
                    <div className="box-border  h-screen   overflow-hidden flex flex-col ">
                      <MobileHeader className=" md:hidden small-menu  h-20 w-full border-b-1 sticky top-0 z-3 "></MobileHeader>

                      <div className=" flex flex-1 overflow-hidden justify-center  w-full h-full">
                        <SideBar className=" gradient-for-vert-containers min-w-45 xl:max-w-70 z-100 md:visible w-55 invisible flex flex-col px-2 py-2 md:relative fixed h-full left-0 md:top-0" />

                        <main className="gradient-for-main flex flex-col h-full flex-1 min-h-0 items-center  border-x-1 border-b-1 pb-[clamp(8px,4vh,50px)] w-vw dark:bg-neutral-950 w-full">
                          <TopBar className="z-2 mb-[clamp(8px,4vh,50px)]  invisible relative h-0 md:h-10 w-full md:visible" />
                          {children}
                        </main>
                      </div>
                    </div>
                  </PrioritiesProvider>
                </CommentsNonProjectProvider>
              </AllCommentsProvider>
            </TasksProviderGroup>
          </ProjectProvider>
        </AllProjectsProvider>
      </CurrentSessionProvider>
    </DashBoardProvider>
    // </TasksProvider>
  );
}

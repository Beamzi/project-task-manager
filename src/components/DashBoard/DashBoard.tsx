import SideBar from "./SideBar";
import { DashBoardProvider } from "../DashBoardProvider";
import DashBoardOverlay from "./DashBoardOverlay";
import { ProjectProvider } from "../ProjectProvider";
import { prisma } from "@/lib/prisma";

import { Bars3Icon } from "@heroicons/react/16/solid";
import MobileHeader from "./MobileHeader";
import TopBar from "./TopBar";

async function getProjects() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: {
      title: true,
      id: true,
    },
  });
  return projects;
}

export default async function DashBoard({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();
  return (
    <DashBoardProvider>
      <ProjectProvider value={projects}>
        <DashBoardOverlay />
        <div className="relative w-vw sm:p-5 ">
          <MobileHeader className=" sm:hidden small-menu -mr-px -mt-px h-20 w-full border-b-1 sticky top-0 z-3"></MobileHeader>

          <TopBar className="z-2 relative sm:h-20 h-0 sm:border-y-1 w-full sm:visible"></TopBar>

          <div className="z-2 flex justify-center relative overflow-auto bg-transparent h-[85dvh]">
            <SideBar className="noise-overlay w-[40%] max-w-55 sm:visible invisible flex flex-col p-5 mr-5 border-x-1 border-b-1  sm:relative fixed h-full left-0 sm:top-0" />
            <div className="sm:w-[100%] w-vw h-[85dvh]">
              <main className="flex flex-col noise-overlay overflow-y-scroll border-x-1 border-b-1 p-5 h-[100%]">
                {children}
              </main>
            </div>
          </div>
        </div>
      </ProjectProvider>
    </DashBoardProvider>
  );
}

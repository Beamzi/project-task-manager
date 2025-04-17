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
        <div className="relative w-vw sm:p-5">
          <MobileHeader className=" sm:hidden small-menu h-20 w-full border-2 sticky top-0 z-2"></MobileHeader>
          <TopBar className="sm:h-20 h-0 sm:border-2 w-full sm:visible" />
          <div className="flex border-2  justify-center relative overflow-auto">
            <SideBar className="sm:visible invisible flex flex-col p-5 border-2 sm:relative fixed h-full left-0 sm:top-0" />
            <div className="sm:w-[100%] w-vw">
              <main className="overflow-y-scroll border-2  p-5 h-[70%]">
                {children}
              </main>
            </div>
          </div>
        </div>
      </ProjectProvider>
    </DashBoardProvider>
  );
}

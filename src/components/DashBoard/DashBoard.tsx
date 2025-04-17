import SideBar from "./SideBar";
import { DashBoardProvider } from "../DashBoardProvider";
import DashBoardOverlay from "./DashBoardOverlay";
import { ProjectProvider } from "../ProjectProvider";
import { prisma } from "@/lib/prisma";

import { Bars3Icon } from "@heroicons/react/16/solid";
import Header from "./Header";

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
        <div>
          <Header className=" sm:hidden small-menu h-20 w-full border-2"></Header>
          <div className="flex border-2 w-dvw p-5 justify-center relative">
            <SideBar className="sm:visible invisible flex flex-col p-5 border-2 absolute sm:relative left-0 top-0 dark:bg-black" />
            <main className="border-2 p-5 w-[80%]">{children}</main>
          </div>
        </div>
      </ProjectProvider>
    </DashBoardProvider>
  );
}

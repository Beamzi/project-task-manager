import SideBar from "./SideBar";
import { DashBoardProvider } from "../Providers/DashBoardProvider";
import { auth } from "../../../auth";
import { getAllProjects } from "@/lib/queries/getAllProjects";
import CurrentSessionProvider from "../Providers/CurrentSessionProvider";
import { getAllTasks } from "@/lib/queries/getAllTasks";
import ServerProviderGroup from "../Providers/serverProviders/ServerProviderGroup";
import MobileHeader from "./MobileHeader";
import TopBar from "./TopBar";
import getAllComments from "@/lib/queries/getAllComments";

export default async function DashBoard({
  children,
}: {
  children: React.ReactNode;
}) {
  const allTasks = await getAllTasks();
  const allProjects = await getAllProjects();
  const session = await auth();
  const allComments = await getAllComments();

  return (
    <DashBoardProvider>
      <CurrentSessionProvider value={session}>
        <ServerProviderGroup
          allTasks={allTasks}
          allProjects={allProjects}
          allComments={allComments}
        >
          <div className="box-border  h-screen overflow-hidden flex flex-col ">
            <MobileHeader className=" md:hidden small-menu  h-20 w-full border-b-1 sticky top-0 z-3 "></MobileHeader>

            <div className=" relative flex flex-1 overflow-hidden justify-center w-full h-full">
              <SideBar className=" gradient-for-vert-containers min-w-45 xl:max-w-70 z-100 md:visible w-55 invisible flex flex-col px-2 py-2 md:relative fixed h-full left-0 md:top-0" />

              <main className="gradient-for-main flex flex-col h-full flex-1 min-h-0 items-center border-x-1 border-b-1 pb-[clamp(8px,4vh,50px)] w-vw bg-neutral-950 w-full">
                <TopBar className="z-2 invisible absolute top-0 right-0   md:relative h-0 md:h-10 w-full md:visible" />
                {children}
              </main>
            </div>
          </div>
        </ServerProviderGroup>
      </CurrentSessionProvider>
    </DashBoardProvider>
  );
}

import { prisma } from "@/lib/prisma";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import ProjectView from "@/components/ProjectView";
import { Prisma } from "@prisma/client";
import { auth } from "../../../../auth";

interface Props {
  params: {
    id: string;
  };
}

const fullProjectQuery = {
  include: {
    tasks: {
      include: {
        author: {
          select: { name: true },
        },
      },
    },
    comments: {
      orderBy: {
        createdAt: "asc",
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    },
  },
} as const;

export type FullProject = Prisma.ProjectGetPayload<typeof fullProjectQuery>;

export default async function CurrentProject({ params }: Props) {
  const { id } = await params;
  async function getProject() {
    const project = await prisma.project.findUnique({
      where: { id },

      ...fullProjectQuery,
    });
    return project;
  }

  const project = await getProject();
  const tasks = project?.tasks;
  const comments = project?.comments;
  const session = await auth();
  const profileImg = session?.user?.image;

  console.log({ session });
  return (
    <>
      <div className="flex px-6 relative bg-transparent  justify-center">
        <div className="w-1/2  flex flex-col border-1 border-dotted  dark:bg-neutral-900">
          <p className="border-b-1 border-dotted px-2 py-2 ">Project </p>
          <ProjectView
            project={project}
            comments={comments}
            profileImg={profileImg}
          ></ProjectView>
        </div>
        <div className="border-1 ml-6 border-dotted w-1/2 bg-neutral-900 ">
          <p className="px-2 py-2">Project Tasks </p>
          <div
            id="task-scroll-container"
            className="border-t-1 border-dotted bg-neutral-900 flex  content-start w-full relative flex-wrap overflow-y-scroll h-[40dvh]"
          >
            <div className="OVERLAY task-scroll-shadow h-0 sticky top-0 z-10 left-0 w-[100%]"></div>

            <ListOfTasks currentTasks={tasks} />
          </div>
        </div>
      </div>
    </>
  );
}

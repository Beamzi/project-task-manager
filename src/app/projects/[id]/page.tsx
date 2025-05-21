import { prisma } from "@/lib/prisma";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import ProjectView from "@/components/ProjectView";
import { Prisma } from "@prisma/client";
import { auth } from "../../../../auth";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import RemoveProject from "@/components/buttons/RemoveProject";

interface Props {
  params: {
    id: string;
  };
}

const fullProjectQuery = {
  include: {
    author: {
      select: { name: true },
    },
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
  const session = await auth();
  const { id } = await params;

  async function getProject() {
    if (session) {
      const project = await prisma.project.findUnique({
        where: {
          id: id,
          author: {
            id: session?.user?.id,
          },
        },

        ...fullProjectQuery,
      });
      return project;
    } else return null;
  }

  const project = await getProject();
  const tasks = project?.tasks;
  const comments = project?.comments;
  const profileImg = session?.user?.image;

  console.log({ session });
  return (
    <>
      <RemoveProject project={project} />
      <FirstRowContainers
        leftData={
          <ProjectView
            project={project}
            comments={comments}
            profileImg={profileImg}
          ></ProjectView>
        }
        rightData={<ListOfTasks currentTasks={tasks} />}
        height="h-[70dvh]"
      ></FirstRowContainers>
    </>
  );
}

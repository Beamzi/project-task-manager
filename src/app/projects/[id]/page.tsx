import { prisma } from "@/lib/prisma";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import ProjectView from "@/components/ProjectView";
import { Prisma } from "@prisma/client";
import { auth } from "../../../../auth";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";

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
      <FirstRowContainers
        leftData={
          <ProjectView
            project={project}
            comments={comments}
            profileImg={profileImg}
          ></ProjectView>
        }
        rightData={<ListOfTasks currentTasks={tasks} />}
        leftTitle="Project"
        rightTitle="Project Tasks"
        height="h-[70dvh]"
      ></FirstRowContainers>
    </>
  );
}

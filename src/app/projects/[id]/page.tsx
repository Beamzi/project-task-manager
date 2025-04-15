import { prisma } from "@/lib/prisma";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import ProjectView from "@/components/ProjectView";
import { Prisma } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
}

export default async function CurrentProject({ params }: Props) {
  async function getProject() {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id: id },
      include: {
        tasks: {
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return project;
  }

  const project = await getProject();

  const tasks = project?.tasks;
  console.log({ project, tasks });
  return (
    <div>
      <ProjectView project={project}></ProjectView>
      <ListOfTasks currentTasks={tasks}></ListOfTasks>
    </div>
  );
}

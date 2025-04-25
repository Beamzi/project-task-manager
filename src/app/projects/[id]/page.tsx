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
  return (
    <div className=" flex flex-col lg:flex-row align-middle py-4 w-[100%] lg:pl-4">
      <ProjectView project={project}></ProjectView>

      <div className="w-[100%] lg:px-4 overflow-scroll h-155">
        <ListOfTasks
          currentTasks={tasks}
          taskParentClasses={"gofkurself"}
        ></ListOfTasks>
      </div>
    </div>
  );
}

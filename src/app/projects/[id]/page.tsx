import { prisma } from "@/lib/prisma";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import ProjectView from "@/components/ProjectView";
import { Prisma } from "@prisma/client";
import { auth } from "../../../../auth";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import RemoveProject from "@/components/buttons/RemoveProject";
import { UserPlusIcon } from "@heroicons/react/24/outline";

import { redirect } from "next/navigation";
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

      if (!project || project.authorId !== session?.user?.id) {
        redirect("/not-found");
      }
      return project;
    } else return null;
  }

  const project = await getProject();
  const tasks = project?.tasks;
  const comments = project?.comments;
  const profileImg = session?.user?.image;

  return (
    <>
      <section className="w-full px-[clamp(16px,2vw,24px)]  xl:w-[80%]">
        <div className=" gradient-for-thin-containers border-1 flex justify-end rounded-xl py-2 px-2 outline-4 -outline-offset-5 outline-neutral-900">
          <button className="border-1 w-10 flex justify-center items-center content-center px-2 py-1 rounded-lg mr-2">
            <UserPlusIcon className="w-6" />
          </button>
          <RemoveProject project={project} />
        </div>
      </section>
      <FirstRowContainers
        leftData={
          <ProjectView
            project={project}
            comments={comments}
            profileImg={profileImg}
          ></ProjectView>
        }
        rightData={<ListOfTasks currentTasks={tasks} />}
        height="h-full"
        ifBottomRow={true}
      ></FirstRowContainers>
    </>
  );
}


import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import { Prisma } from "@prisma/client";

export type GetPrioritiesTypeOf = Prisma.TaskGetPayload<typeof getPrioritiesQuery>

const getPrioritiesQuery = {
    include: {
        author: {
            select: {
                name: true,
            },
        },
    },
} as const


export async function getPriorities() {
  const session = await auth();
    const priorityTasks = await prisma.task.findMany({
      where: {
        author: {
          id: session?.user?.id,
        },
        priority: true,
      },
      ...getPrioritiesQuery
    });
    return priorityTasks;

}

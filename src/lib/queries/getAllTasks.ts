import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import { Prisma } from "@prisma/client";

export type getAllTasksTypeOf = Prisma.TaskGetPayload<typeof getAllTasksQuery>

const getAllTasksQuery = {
    include: {
        author: {
            select: { name: true },
        },
    },
} as const

export async function getAllTasks() {
  const session = await auth();
  let empty: [] = [];
  if (session) {
    const tasks = await prisma.task.findMany({
        where: {
            author: { id: session?.user?.id },
        },
        orderBy: {
            createdAt: "asc",
        },
        ...getAllTasksQuery

    });
    return tasks;
  } else {
    return empty;
  }
}

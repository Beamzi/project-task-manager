
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import { Prisma } from "@prisma/client";

export type GetAllTasksByDueDateTypeOf = Prisma.TaskGetPayload<typeof getAllTasksQuery>

const getAllTasksQuery = {
    include: {
        author: {
            select: {name: true}
        }
    }
} as const

export async function getAllTasksByDueDate() {
  const session = await auth();
    const result = await prisma.task.findMany({
        orderBy: {
            date: "asc",
        },
        where: {
            author: { id: session?.user?.id },
        },
        ...getAllTasksQuery
    });
    return result;
}

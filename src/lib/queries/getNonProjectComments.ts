
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import { Prisma } from "@prisma/client";

export type GetNonProjectCommentsTypeOf = Prisma.TaskGetPayload<typeof getNonProjectCommentsQuery>

const getNonProjectCommentsQuery = {
          include: {
        author: {
          select: {
            name: true,
          },
        },
      },
} as const

export async function getNonProjectComments() {
  const session = await auth();
    const comments = await prisma.comments.findMany({
      where: {
        author: { id: session?.user?.id },
        projectId: null,
      },
      ...getNonProjectCommentsQuery
    });
    return comments;
}
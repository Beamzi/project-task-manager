import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
import InboxClient from "@/components/InboxClient";
import { Prisma } from "@prisma/client";

const getTasksForSortingQuery = {
  orderBy: {
    date: "asc",
  },
  include: {
    author: {
      select: { name: true },
    },
  },
} as const;

export type TasksForSorting = Prisma.TaskGetPayload<
  typeof getTasksForSortingQuery
>;

async function getTasksForSorting() {
  const session = await auth();
  if (session) {
    const tasks = await prisma.task.findMany({
      where: {
        author: { id: session?.user?.id },
      },
      ...getTasksForSortingQuery,
    });
    return tasks;
  } else return [];
}

export default async function Inbox() {
  const tasks = await getTasksForSorting();

  return (
    <>
      <InboxClient tasks={tasks} />
    </>
  );
}

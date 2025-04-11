import Image from "next/image";
import Task from "@/components/Task";
import ClientWrapper from "@/components/ClientWrapper";

import { prisma } from "@/lib/prisma";
async function getTasks() {
  const tasks = await prisma.task.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return tasks;
}

export default async function Home() {
  const tasks = await getTasks();
  console.log(tasks);
  return (
    <ClientWrapper tasks={tasks}>
      <Task></Task>
    </ClientWrapper>
  );
}

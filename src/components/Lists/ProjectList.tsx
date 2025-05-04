"use client";

import { useContext } from "react";

import { prisma } from "@/lib/prisma";
import ProjectListBtn from "./ProjectListBtn";
import { projectContext } from "@/context/ProjectContext";

export default function ProjectList() {
  const projects = useContext(projectContext);

  if (!projects) {
    throw new Error("no project");
  }
  return (
    <div className="flex flex-col">
      {projects?.map((item) => (
        <>
          <ProjectListBtn
            key={item.id}
            title={item.title}
            id={item.id}
          ></ProjectListBtn>
        </>
      ))}
    </div>
  );
}

/*

async function getProjects() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: {
      title: true,
      id: true,
    },
  });
  return projects;
}

export default async function ProjectList() {
  const projects = await getProjects();
  return (
    <div className="flex flex-col">
      {projects?.map((item) => (
        <ProjectListBtn
          key={item.id}
          title={item.title}
          id={item.id}
        ></ProjectListBtn>
      ))}
    </div>
  );
}

*/

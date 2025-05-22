"use client";

import { useContext, useEffect, useState } from "react";
import ProjectListBtn from "./ProjectListBtn";
import { projectContext } from "@/context/ProjectContext";
import { DashBoardContext } from "@/context/DashBoardContext";
import Link from "next/link";

export default function ProjectList({
  active,
  projectListClient,
  projectListIds,
}: {
  active: (value: string) => void;
  projectListClient: string[];
  projectListIds: string[];
}) {
  const projects = useContext(projectContext);

  if (!projects) {
    throw new Error("no project");
  }

  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("dashboard props not loaded");
  }

  const { removeProjectFromDashboard } = context;

  return (
    <>
      <div className="flex flex-col">
        {projects.map((item) => (
          <ProjectListBtn
            key={item.id}
            title={item.title}
            id={item.id}
            active={active}
          />
        ))}
      </div>

      {projectListClient.map((item, index) => {
        const isHidden = removeProjectFromDashboard.includes(
          projectListIds[index]
        );
        return (
          <div
            key={`${item}${index}`}
            className={`${
              isHidden ? "hidden" : ""
            } flex overflow-hidden w-[95%]`}
          >
            <div className="border-l-2 pl-3 ml-4 border-neutral-600"></div>
            <Link
              className="text-start py-1 text-sm px-2 text-neutral-400"
              href={`/projects/${projectListIds[index]}`}
            >
              {item}
            </Link>
          </div>
        );
      })}
    </>
  );
}

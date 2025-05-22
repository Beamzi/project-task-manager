"use client";

import React, { useContext } from "react";
import { FullProject } from "@/app/projects/[id]/page";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { DashBoardContext } from "@/context/DashBoardContext";
import { redirect } from "next/navigation";

export default function RemoveProject({ project }: { project: FullProject }) {
  async function deleteProject() {
    try {
      await fetch("/api/delete-project", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId: project.id }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("dashboard props not loaded");
  }

  const { setRemoveProjectFromDashboard, removeProjectFromDashboard } = context;
  return (
    <button
      className="border-1 w-10 flex justify-center items-center content-center px-2 py-1 rounded-lg"
      onClick={() => {
        setRemoveProjectFromDashboard([
          ...removeProjectFromDashboard,
          project.id,
        ]);
        deleteProject();
        redirect("/");
      }}
    >
      <MinusCircleIcon className="w-6" />
    </button>
  );
}

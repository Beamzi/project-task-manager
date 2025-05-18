"use client";

import React from "react";
import { FullProject } from "@/app/projects/[id]/page";

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
  return (
    <button className="border-1 py-1 px-1" onClick={deleteProject}>
      RemoveProject
    </button>
  );
}

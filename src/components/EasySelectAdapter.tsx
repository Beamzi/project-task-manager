"use client";

import { projectContext } from "@/context/ProjectContext";
import React from "react";
import { useContext } from "react";
import EasySelect from "./Lists/EasySelect";

import { project } from "@/context/ProjectContext";
import type { TaskType } from "@/context/TaskContext";

export default function EasySelectAdapter() {
  const projects = useContext(projectContext);
  if (!projects) {
    throw new Error("project not loaded");
  }

  console.log(
    projects,
    "projjjecdctttttssssssprojjjecdctttttssssssprojjjecdctttttssssssprojjjecdctttttssssssprojjjecdctttttssssssprojjjecdctttttssssssprojjjecdctttttssssssprojjjecdctttttssssss"
  );

  console.log(projects);
  return <EasySelect modelList={projects}></EasySelect>;
}

"use client";

import { projectContext } from "@/context/ProjectContext";
import React from "react";
import { useContext } from "react";
import EasySelect from "./Lists/EasySelect";

export default function EasySelectAdapter() {
  const projects = useContext(projectContext);
  if (!projects) {
    throw new Error("project not loaded");
  }

  return <EasySelect modelList={projects}></EasySelect>;
}

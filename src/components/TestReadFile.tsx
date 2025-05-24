"use client";

import React from "react";
import { useContext } from "react";
import { AllProjectsContext } from "@/context/AllProjectsContext";

export default function TestReadFile() {
  const allProjects = useContext(AllProjectsContext);

  if (!allProjects) {
    throw new Error("projects not loaded");
  }

  console.log(allProjects, "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");

  return (
    <div>
      asd
      {allProjects.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}

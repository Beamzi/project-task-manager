"use client";

import { projectContext } from "@/context/ProjectContext";
import { useContext } from "react";
import { useState } from "react";
import React from "react";
import LinkTaskToProjectBtn from "./LinkTaskToProjectBtn";

export default function ProjectAssignBtn({ id }: { id: string }) {
  const taskId = id;
  const projects = useContext(projectContext);
  const [list, setList] = useState(false);

  return (
    <div className="flex flex-col">
      <button className="bg-white" onClick={() => setList(true)}>
        ProjectAssignBtn
      </button>
      {list && (
        <ul>
          {projects?.map((item) => (
            <li className="border-b-1" key={item.id}>
              <LinkTaskToProjectBtn
                title={item.title}
                projectId={item.id}
                taskId={taskId}
              >
                {item.title}
              </LinkTaskToProjectBtn>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

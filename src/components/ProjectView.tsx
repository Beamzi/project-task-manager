"use client";

import React from "react";
import { useState } from "react";

interface Props {
  project: {
    id: string;
    title: string;
    description: string;
    published: boolean;
    tasks: Array<{
      author: { name: string | null } | null;
    }> | null;
  } | null;
}

const reducer = (state, action) => {};

export default function ProjectView({ project }: Props) {
  const [title, setTitle] = useState(project?.title);
  const [description, setDescription] = useState(project?.description);
  console.log({ project });

  async function updateProject() {
    try {
      await fetch("/api/update-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: project?.id,
          title: title,
          description: description,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="lg:max-h-200 w-full py-2 border-1 align-middle">
      <h3 className="text-sm text-start py-2">
        {project?.tasks?.[0]?.author?.name}
      </h3>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="text-lg pb-2"
      ></input>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="lg:min-h-80 h-45 my-2"
        //defaultValue={project?.description ?? ""}
      ></textarea>
      <button onClick={() => updateProject()} className="bg-black p-5">
        submit
      </button>
    </div>
  );
}

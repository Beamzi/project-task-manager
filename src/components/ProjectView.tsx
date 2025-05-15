"use client";

import React from "react";
import { useState } from "react";
import CreateComment from "./CreateComment";
import { FullProject } from "@/app/projects/[id]/page";
import EditComment from "./EditComment";

interface ProjectViewProps {
  project: FullProject | null;
  comments: FullProject["comments"] | undefined;
  profileImg: string | null | undefined;
}

const reducer = (state, action) => {};

export default function ProjectView({
  project,
  comments,
  profileImg,
}: ProjectViewProps) {
  const [title, setTitle] = useState(project?.title);
  const [description, setDescription] = useState(project?.description);

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
    <div className="px-3 pr-2  w-full py-2 flex flex-col">
      <h3 className="break-all text-sm text-start py-2">
        {project?.tasks?.[0]?.author?.name}
      </h3>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="break-all text-lg pb-2 w-full"
      ></input>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="break-all h-45 my-2"
        //defaultValue={project?.description ?? ""}
      ></textarea>

      <button onClick={() => updateProject()} className="border-1 py-2 mx-5">
        submit
      </button>

      <div className="py-2">
        <h1 className="py-2">comments</h1>
        <hr></hr>
        {comments?.map((comment) => (
          <EditComment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            name={comment.author?.name}
            createdAt={comment.createdAt}
            profileImg={profileImg}
          ></EditComment>
        ))}
      </div>

      <CreateComment projectId={project?.id} profileImg={profileImg} />
    </div>
  );
}

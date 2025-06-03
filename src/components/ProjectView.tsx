"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import CreateComment from "./CreateComment";

import EditComment from "./EditComment";
import SaveOnchange from "./SaveOnchange";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { GetAllProjecttypeOf } from "@/lib/queries/getAllProjects";

interface ProjectViewProps {
  project: GetAllProjecttypeOf | null;
  comments: GetAllProjecttypeOf["comments"] | undefined;
  profileImg: string | null | undefined;
}

export default function ProjectView({
  project,
  comments,
  profileImg,
}: ProjectViewProps) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description);
  const [localComment, setLocalComment] = useState<string[]>([]);
  const [commentId, setCommentId] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);
  const [init, setInit] = useState(true);

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

  const previousTitle = useRef(title);
  const previousDescription = useRef(description);

  useEffect(() => {
    if (
      title !== previousTitle.current ||
      description !== previousDescription.current
    ) {
      setInit(false);
      setEditing(true);
    }

    const debounce = setTimeout(() => {
      if (
        title !== previousTitle.current ||
        description !== previousDescription.current
      ) {
        updateProject();
        setEditing(false);
        setInit(false);
      }
    }, 400);

    const edit = setTimeout(() => {
      setEditing(false);
    }, 410);

    return () => {
      clearTimeout(edit);
      clearTimeout(debounce);
    };
  }, [title, description]);

  return (
    <div className="project-view px-3 pb-31 pr-2 w-full py-2 flex flex-col">
      <h3 className="break-all text-sm text-start py-2">
        {project?.tasks?.[0]?.author?.name}
      </h3>
      <input
        maxLength={25}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="break-all rounded-lg text-lg pb-2 w-full"
      ></input>
      <textarea
        maxLength={500}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="break-all rounded-lg h-45 my-2"
        //defaultValue={project?.description ?? ""}
      ></textarea>

      {init ? (
        <div className="flex py-1 px-2  w-22 h-8 justify-center align-middle items-center">
          Saved
          <div className="ml-2 flex">
            <CheckCircleIcon className=" stroke-green-400" />
          </div>
        </div>
      ) : (
        <SaveOnchange editing={editing} />
      )}

      <div className="py-2">
        <h1 className="py-2 ">Comments</h1>
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

      {localComment && (
        <div>
          {localComment.map((item, index) => (
            <EditComment
              key={index}
              id={commentId[index]}
              content={item}
              name={project?.author?.name}
              profileImg={profileImg}
              createdAt={new Date()}
              localDelete={true}
            />
          ))}
        </div>
      )}

      <CreateComment
        projectId={project?.id}
        profileImg={profileImg}
        setLocalComment={setLocalComment}
        setCommentId={setCommentId}
      />
    </div>
  );
}

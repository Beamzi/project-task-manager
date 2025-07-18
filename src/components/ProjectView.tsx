"use client";

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useState } from "react";
import CreateComment from "./CreateComment";

import EditComment from "./EditComment";
import SaveOnchange from "./SaveOnchange";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { GetAllProjecttypeOf } from "@/lib/queries/getAllProjects";
import { AllCommentsContext } from "@/context/AllCommentsContext";
import { ParamValue } from "next/dist/server/request/params";
import { SessionContext } from "@/context/SessionContext";

interface ProjectViewProps {
  project: GetAllProjecttypeOf | null;
  projectId?: ParamValue;
  comments?: GetAllProjecttypeOf["comments"] | undefined;
  profileImg: string | null | undefined;
  allProjectsClient?: GetAllProjecttypeOf[];
  setAllProjectsClient: Dispatch<SetStateAction<GetAllProjecttypeOf[]>>;
}

export default function ProjectView({
  project,
  projectId,
  comments,
  profileImg,
  allProjectsClient,
  setAllProjectsClient,
}: ProjectViewProps) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description);
  const [editing, setEditing] = useState(false);
  const [init, setInit] = useState(true);

  const session = useContext(SessionContext);
  if (!session) throw new Error("session not loaded");

  const allCommentsContext = useContext(AllCommentsContext);
  if (!allCommentsContext) throw new Error("comments not loaded");
  const { setAllCommentsClient, allCommentsClient } = allCommentsContext;

  const allCommentsClientCopy = [...allCommentsClient];

  const commentsOfProject = allCommentsClientCopy.filter(
    (item) => item.projectId === projectId
  );

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
    setAllProjectsClient((prev) =>
      prev.map((item) =>
        item.id === projectId
          ? { ...item, title: title, description: description ?? "" }
          : item
      )
    );
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
        {commentsOfProject?.map((comment) => (
          <EditComment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            name={session.user?.name}
            createdAt={comment.createdAt}
            profileImg={profileImg}
            commentsClient={commentsOfProject}
            setCommentsClient={setAllCommentsClient}
          ></EditComment>
        ))}
      </div>

      <CreateComment
        projectId={project?.id}
        profileImg={profileImg}
        setCommentsClient={setAllCommentsClient}
      />
    </div>
  );
}

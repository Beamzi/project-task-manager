"use client";

import React, { useContext, useState } from "react";
import {
  PlusIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { request } from "http";
import { AllProjectsContext } from "@/context/AllProjectsContext";
import { GetAllProjecttypeOf } from "@/lib/queries/getAllProjects";

interface Props {
  setProjectListClient: React.Dispatch<React.SetStateAction<string[]>>;
  projectListClient: string[];
  projectListIds: string[];
  setProjectListIds: React.Dispatch<React.SetStateAction<string[]>>;
  setIsRendered: (value: boolean) => void;
}

export default function NewProjectBtn({
  setProjectListClient,
  projectListClient,
  projectListIds,
  setProjectListIds,
  setIsRendered,
}: Props) {
  const [projectInput, setProjectInput] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");

  const allProjectsContext = useContext(AllProjectsContext);

  if (!allProjectsContext) throw new Error("projects not loaded");
  const { setAllProjectsClient, allProjectsClient } = allProjectsContext;

  async function createProject(
    event: React.FormEvent<HTMLFormElement>,
    tempId: string
  ) {
    event.preventDefault();

    try {
      const request = await fetch("/api/create-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: projectTitle, description: description }),
      });
      const response = await request.json();
      setProjectListIds([...projectListIds, response.result.id]);

      setAllProjectsClient((prev) =>
        prev.map((item) =>
          item.id === tempId ? { ...item, id: response.result.id } : item
        )
      );
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <button type="button" onClick={() => setProjectInput(true)}>
        <PlusIcon />
        New Project
      </button>
      {projectInput && (
        <>
          <div
            onClick={() => setProjectInput(false)}
            className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%] z-50 left-[50%] w-full h-full translate-[-50%]`}
          ></div>

          <form
            aria-placeholder="project title"
            className="gradient-for-inner-containers rounded-xl  border-1 outline-4 -outline-offset-5 p-4 w-100 outline-neutral-900 fixed z-50 top-[50%] left-[50%] translate-[-50%]"
            onSubmit={(event) => {
              const tempId = crypto.randomUUID();

              setProjectListClient([...projectListClient, projectTitle]);
              setAllProjectsClient((prev) => [
                ...prev,
                {
                  title: projectTitle,
                  description: description,
                  id: tempId,
                } as GetAllProjecttypeOf,
              ]);
              createProject(event, tempId);
              setProjectInput(false);
              setIsRendered(true);
            }}
          >
            <input
              placeholder="Project Title"
              minLength={3}
              maxLength={25}
              required
              className="rounded-t-md py-2  text-lg w-full"
              value={projectTitle}
              type="text"
              onChange={(e) => setProjectTitle(e.target.value)}
            ></input>
            <textarea
              placeholder="Description"
              minLength={3}
              maxLength={500}
              required
              className="rounded-b-md py-2 mb-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex">
              <button className="w-full border-1 py-2 rounded-md" type="submit">
                <CheckCircleIcon />
                Submit
              </button>
              <button
                onClick={() => setProjectInput(false)}
                className="w-full border-1 py-2 ml-2 rounded-md"
                type="submit"
              >
                <XCircleIcon />
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

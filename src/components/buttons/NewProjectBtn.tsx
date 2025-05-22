"use client";

import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { request } from "http";

interface Props {
  setProjectListClient: React.Dispatch<React.SetStateAction<string[]>>;
  projectListClient: string[];
  projectListIds: string[];
  setProjectListIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function NewProjectBtn({
  setProjectListClient,
  projectListClient,
  projectListIds,
  setProjectListIds,
}: Props) {
  const [projectTitleInput, setProjectTitleInput] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");

  async function createProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const request = await fetch("/api/create-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: projectTitle }),
      });
      const response = await request.json();
      setProjectListIds([...projectListIds, response.result.id]);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <button type="button" onClick={() => setProjectTitleInput(true)}>
        <PlusIcon />
        New Project
      </button>
      {projectTitleInput && (
        <form
          onSubmit={(event) => {
            setProjectListClient([...projectListClient, projectTitle]);
            createProject(event);
          }}
        >
          <input
            minLength={3}
            maxLength={25}
            required
            className="border-2"
            value={projectTitle}
            type="text"
            onChange={(e) => setProjectTitle(e.target.value)}
          ></input>
          <button type="submit">submit</button>
        </form>
      )}
    </>
  );
}

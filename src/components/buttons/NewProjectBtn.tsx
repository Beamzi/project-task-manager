"use client";

import React, { useState } from "react";

export default function NewProjectBtn() {
  const [projectTitleInput, setProjectTitleInput] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");

  async function createProject(event) {
    //event?.preventDefault();
    try {
      await fetch("/api/create-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: projectTitle }),
      });
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <button onClick={() => setProjectTitleInput(true)}>NewProjectBtn</button>
      {projectTitleInput && (
        <form onSubmit={createProject}>
          <input
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

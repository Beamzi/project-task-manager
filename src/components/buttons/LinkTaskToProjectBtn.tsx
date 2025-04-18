import React from "react";

interface Props {
  title: string;
  projectId: string;
  taskId: string;
}

export default function LinkTaskToProjectBtn({
  title,
  projectId,
  taskId,
}: Props) {
  async function linkTask() {
    try {
      await fetch("api/assign-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: taskId, projectId: projectId }),
      });
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <button onClick={linkTask} key={projectId}>
      {title}
    </button>
  );
}

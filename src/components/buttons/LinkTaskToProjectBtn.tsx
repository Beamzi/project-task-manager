"use client";
import React, { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
interface Props {
  title: string;
  projectId: string;
  taskId?: string;
  setList: (value: boolean) => void;
  setTitleCheck: (value: string) => void;
  setAssignCheck: (value: boolean) => void;
  isFirstProject?: boolean;
}

export default function LinkTaskToProjectBtn({
  title,
  projectId,
  taskId,
  setList,
  setTitleCheck,
  setAssignCheck,
}: Props) {
  const tasksContext = useContext(TaskContext);
  if (!tasksContext) {
    throw new Error("hello");
  }
  const { setAllTasksClient } = tasksContext;

  async function linkTask() {
    setAllTasksClient((prev) =>
      prev.map((item) =>
        item.id === taskId ? { ...item, projectId: projectId } : item
      )
    );
    try {
      const request = await fetch("/api/assign-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: taskId, projectId: projectId }),
      });

      const response = await request.json();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <button
      className="w-full min-w-25 text-left p-1 "
      onClick={() => {
        linkTask();
        setList(false);
        setTitleCheck(title);
        setAssignCheck(true);
      }}
      key={projectId}
    >
      {title}
    </button>
  );
}

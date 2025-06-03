"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashBoardContext } from "@/context/DashBoardContext";
import { TaskContext } from "@/context/TaskContext";
interface Props {
  title: string;
  projectId: string;
  taskId?: string;
  setList: (value: boolean) => void;
  setTitleCheck: (value: string) => void;
  setAssignCheck: (value: boolean) => void;
}

export default function LinkTaskToProjectBtn({
  title,
  projectId,
  taskId,
  setList,
  setTitleCheck,
  setAssignCheck,
}: Props) {
  const router = useRouter();

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) {
    throw new Error("hello");
  }
  const { setAllTasksClient, allTasksClient } = tasksContext;

  useEffect(() => {
    const findProjectId = allTasksClient.find((p) => (p.projectId = projectId));

    if (findProjectId) {
      setAssignCheck(true);
    }
  }, [projectId, allTasksClient]);

  async function linkTask() {
    // const { list, setList } = listState;
    try {
      const response = await fetch("/api/assign-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: taskId, projectId: projectId }),
      });

      const data = await response.json();

      setAllTasksClient((prev) =>
        prev.map((item) =>
          item.id === taskId ? { ...item, projectId: projectId } : item
        )
      );

      // router.refresh();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <button
      className=" w-full text-left p-1 "
      onClick={() => {
        linkTask();
        setList(false);
        // router.refresh();
        setTitleCheck(title);
        setAssignCheck(true);
      }}
      key={projectId}
    >
      {title}
    </button>
  );
}

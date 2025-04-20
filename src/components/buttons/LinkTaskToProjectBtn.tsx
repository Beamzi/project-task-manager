import React from "react";

interface Props {
  title: string;
  projectId: string;
  taskId: string;
  setList: (value: boolean) => void;
}

export default function LinkTaskToProjectBtn({
  title,
  projectId,
  taskId,
  setList,
}: Props) {
  async function linkTask() {
    // const { list, setList } = listState;
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
    <button
      className="hover:text-rose-600 w-full text-left p-1 hover:bg-neutral-800 hover:border-r-3"
      onClick={() => {
        linkTask();
        setList(false);
      }}
      key={projectId}
    >
      {title}
    </button>
  );
}

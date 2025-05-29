import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
interface Props {
  title: string;
  projectId: string;
  taskId: string;
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

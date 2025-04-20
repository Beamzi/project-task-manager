import React from "react";
import { useRouter } from "next/navigation";
interface Props {
  title: string;
  projectId: string;
  taskId: string;
  setList: (value: boolean) => void;
  setTitleCheck: (value: boolean) => void;
  titleCheck: boolean;
}

export default function LinkTaskToProjectBtn({
  title,
  projectId,
  taskId,
  setList,
  setTitleCheck,
  titleCheck,
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

      console.log(data, "fuckoffdickeahd");
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
        router.refresh();
        setTitleCheck(true);
      }}
      key={projectId}
    >
      {title}
    </button>
  );
}

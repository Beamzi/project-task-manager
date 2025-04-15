"use client";

import ProjectAssignBtn from "./buttons/ProjectAssignBtn";
import RemoveTaskBtn from "./buttons/RemoveTaskBtn";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  author: string | null | undefined;
  title: string;
  date: string;
  content: string | null;
  id: string;
}

export default function Task({ author, title, date, content, id }: Props) {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState(`${title}`);
  const [select, setSelect] = useState(false);

  async function updateTask() {
    try {
      await fetch("/api/update-task", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, id: id }),
      });
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div className="border-2 my-5 p-5 flex flex-col">
        <h3>{author}</h3>
        <form onSubmit={updateTask}>
          <input
            value={select ? newTitle : title}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            onClick={() => setSelect(true)}
            type="text"
          ></input>
          <p>{date}</p>
          <p>{content}</p>
          <button type="submit" className="bg-green-900">
            SAVE
          </button>
        </form>
        <RemoveTaskBtn id={id}></RemoveTaskBtn>
        <ProjectAssignBtn id={id}></ProjectAssignBtn>
      </div>
    </>
  );
}

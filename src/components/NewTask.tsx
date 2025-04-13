"use client";

import { format } from "date-fns";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewTask() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function createTask(event) {
    event.preventDefault();
    try {
      await fetch("/api/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, content: content, date: date }),
      });
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form
      onSubmit={createTask}
      className="border-2 flex flex-col p-5 [&>*]:my-2"
    >
      <label>
        title
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="border-2 w-full"
          type="text"
        ></input>
      </label>
      <label>
        date
        <input
          onChange={(event) => setDate(event.target.value)}
          value={date}
          className="border-2 w-full"
          type="datetime-local"
          max="9999-12-31T23:59"
        ></input>
      </label>
      <label>
        description
        <input
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="border-2 w-full"
          type="text"
        ></input>
      </label>
      <button className="border-2 w-full py-3" type="submit">
        submit
      </button>
    </form>
  );
}

"use client";

import ProjectAssignBtn from "./buttons/ProjectAssignBtn";
import RemoveTaskBtn from "./buttons/RemoveTaskBtn";
import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import PriorityBtn from "./buttons/PriorityBtn";

interface Props {
  author: string | null | undefined;
  title: string;
  date: string;
  content: string | null;
  id: string;
  priority: boolean;
}

function reducer(state, action) {
  switch (action.type) {
    case "change-values": {
      return {
        ...state,
        newTitle: action.propTitle ?? state.newTitle,
        newContent: action.propContent ?? state.newContent,
        newDate: action.propDate ?? state.newDate,
      };
    }
  }
}

export default function Task({
  author,
  title,
  date,
  content,
  id,
  priority,
}: Props) {
  const router = useRouter();
  const [select, setSelect] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    newTitle: `${title}`,
    newContent: `${content}`,
    newDate: `${date}`,
  });

  async function updateTask() {
    try {
      await fetch("/api/update-task", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: state.newTitle,
          content: state.newContent,
          date: state.newDate,
          id: id,
        }),
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
            value={select ? state.newTitle : title}
            onChange={(e) =>
              dispatch({ type: "change-values", propTitle: e.target.value })
            }
            onClick={() => setSelect(true)}
            type="text"
          ></input>

          <input
            value={select ? state.newContent : content}
            onChange={(e) =>
              dispatch({ type: "change-values", propContent: e.target.value })
            }
            onClick={() => setSelect(true)}
            type="text"
          ></input>
          <p>{date}</p>

          <input
            type="datetime-local"
            max="9999-12-31T23:59"
            value={select ? state.newDate : date}
            onChange={(e) =>
              dispatch({ type: "change-values", propDate: e.target.value })
            }
            onClick={() => setSelect(true)}
          ></input>

          <button type="submit" className="bg-green-900">
            SAVE
          </button>
        </form>
        <PriorityBtn id={id} priorityState={priority}></PriorityBtn>
        <RemoveTaskBtn id={id}></RemoveTaskBtn>
        <ProjectAssignBtn id={id}></ProjectAssignBtn>
      </div>
    </>
  );
}

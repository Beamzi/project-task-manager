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
      <div className="task-shadows md:m-[4px] md:w-[calc(50%-8px)] lg:w-[calc(33%-10px)] lg:m-[3.3px] w-[80dvw] border-1 my-5 p-5 flex flex-col bg-neutral-800">
        <h3 className="bg-transparent my-1 text-end">{author}</h3>

        <div className="flex border-1 mb-1">
          <ProjectAssignBtn id={id}></ProjectAssignBtn>

          <RemoveTaskBtn id={id}></RemoveTaskBtn>
        </div>
        <input
          value={select ? state.newTitle : title}
          onChange={(e) =>
            dispatch({ type: "change-values", propTitle: e.target.value })
          }
          onClick={() => setSelect(true)}
          type="text"
        ></input>
        <textarea
          className="min-h-35 border-1"
          value={select ? state.newContent : content}
          onChange={(e) =>
            dispatch({ type: "change-values", propContent: e.target.value })
          }
          onClick={() => setSelect(true)}
        ></textarea>
        <input
          className=""
          type="datetime-local"
          max="9999-12-31T23:59"
          value={select ? state.newDate : date}
          onChange={(e) =>
            dispatch({ type: "change-values", propDate: e.target.value })
          }
          onClick={() => setSelect(true)}
        ></input>

        <div className="flex mt-1">
          <button
            onClick={updateTask}
            type="submit"
            className="bg-green-900 w-2/4"
          >
            SAVE
          </button>

          <PriorityBtn id={id} priorityState={priority}></PriorityBtn>
        </div>
      </div>
    </>
  );
}

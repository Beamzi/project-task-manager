"use client";

import ProjectAssignBtn from "./buttons/ProjectAssignBtn";
import RemoveTaskBtn from "./buttons/RemoveTaskBtn";
import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import PriorityBtn from "./buttons/PriorityBtn";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import MinimiseTaskBtn from "./buttons/MinimiseTaskBtn";

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
      <div className="task-selector task-shadows lg:m-[4px] lg:w-[calc(50%-8px)] xl:w-[calc(33%-10px)] xl:m-[3.3px] w-[100%] border-1 my-5 p-5 flex flex-col bg-neutral-800">
        <h3 className="bg-transparent my-1 text-end">{author}</h3>
        <div className="flex mb-1 py-1">
          <ProjectAssignBtn id={id}></ProjectAssignBtn>
          <div className="flex justify-end relative ">
            <MinimiseTaskBtn id={id}></MinimiseTaskBtn>
            <RemoveTaskBtn id={id}></RemoveTaskBtn>
          </div>
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

        <div className="flex mt-1 py-1">
          <div className="w-2/4">
            <button
              onClick={updateTask}
              type="submit"
              className=" flex py-2 px-5 "
            >
              Saved
              <CheckCircleIcon className="ml-2 stroke-green-400" />
            </button>
          </div>
          <PriorityBtn id={id} priorityState={priority}></PriorityBtn>
        </div>
      </div>
    </>
  );
}

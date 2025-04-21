"use client";

import ProjectAssignBtn from "./buttons/ProjectAssignBtn";
import RemoveTaskBtn from "./buttons/RemoveTaskBtn";
import { useContext, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import PriorityBtn from "./buttons/PriorityBtn";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import MinimiseTaskBtn from "./buttons/MinimiseTaskBtn";
import { motion } from "motion/react";
import { DashBoardContext } from "@/context/DashBoardContext";

interface Props {
  author: string | null | undefined;
  title: string;
  date: string;
  content: string | null;
  id: string;
  priority: boolean;
  projectId: string;
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
  projectId,
}: Props) {
  const router = useRouter();
  const [select, setSelect] = useState(false);
  const [minimise, setMinimise] = useState(false);
  const [status, setStatus] = useState("initial");
  const [state, dispatch] = useReducer(reducer, {
    newTitle: `${title}`,
    newContent: `${content}`,
    newDate: `${date}`,
  });

  const context = useContext(DashBoardContext);

  const { taskRef } = context;

  const motionProps = {
    initial: status === "initial" ? { opacity: 1 } : { opacity: 0 },
    animate: { opacity: 1 },
  };

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
      <motion.div
        ref={taskRef}
        id={id}
        initial={{ height: 500 }}
        transition={{ duration: 0.3 }}
        animate={minimise ? { height: 200 } : { height: 500 }}
        className={`origin-top ${
          minimise && "origin-top hello"
        }task-selector task-shadows w-130 border-1  p-5  mx-2  flex flex-col bg-neutral-800`}
      >
        <h3 className="bg-transparent my-1 text-end">{author}</h3>
        <div className="flex mb-1 py-1">
          <ProjectAssignBtn
            taskId={id}
            projectIdOfTask={projectId}
          ></ProjectAssignBtn>
          <div className="flex justify-end relative ">
            <MinimiseTaskBtn
              id={id}
              setMinimise={setMinimise}
              minimise={minimise}
              status={status}
              setStatus={setStatus}
            ></MinimiseTaskBtn>
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
        {!minimise && (
          <>
            <motion.textarea
              {...motionProps}
              className="origin-bottom min-h-35 border-1"
              value={select ? state.newContent : content}
              onChange={(e) =>
                dispatch({
                  type: "change-values",
                  propContent: e.target.value,
                })
              }
              onClick={() => setSelect(true)}
            ></motion.textarea>
            <motion.input
              {...motionProps}
              type="datetime-local"
              max="9999-12-31T23:59"
              value={select ? state.newDate : date}
              onChange={(e) =>
                dispatch({ type: "change-values", propDate: e.target.value })
              }
              onClick={() => setSelect(true)}
            ></motion.input>
            <motion.div {...motionProps} className="flex mt-1 py-1">
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
            </motion.div>
          </>
        )}
      </motion.div>
    </>
  );
}

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
import { format } from "date-fns";
import TimeOptions from "./TimeOptions";

interface Props {
  author: string | null | undefined;
  title: string;
  date: Date;
  content: string | null;
  id: string;
  priority: boolean;
  projectId: string | null;
  taskParentClasses: string;
}

interface viewSpecificProps {}

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
  const [minimise, setMinimise] = useState(true);
  const [status, setStatus] = useState("initial");
  const [onHover, setOnHover] = useState(
    minimise && `opacity-0 hover:opacity-100`
  );
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const formattedTrueDate = format(new Date(date), "yyyy-MM-dd'T'HH:mm");

  const [state, dispatch] = useReducer(reducer, {
    newTitle: `${title}`,
    newContent: `${content}`,
    newDate: `${formattedTrueDate}`,
  });

  const [quickDate, setQuickDate] = useState<Date>(date);
  const context = useContext(DashBoardContext);

  if (!context) {
    throw new Error("dashboard props not loaded");
  }
  const { globalMinimised, setGlobalMinimised } = context;

  const motionProps = {
    initial: status === "initial" ? { opacity: 1 } : { opacity: 0 },
    animate: { opacity: 1 },
  };
  //Type '(scopedDate: Date) => Promise<void>'
  async function updateTask(scopedDate: Date) {
    try {
      await fetch("/api/update-task", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: state.newTitle,
          content: state.newContent,
          date: scopedDate && scopedDate,
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
        onHoverStart={() => setOnHover("")}
        onHoverEnd={() => setOnHover("opacity-0 hover:opacity-100")}
        id={id}
        initial={!minimise && { height: 500 }}
        transition={{ duration: 0.3 }}
        animate={minimise ? { height: 104 } : { height: 330 }}
        className={` origin-top ${
          minimise &&
          "origin-top hello relative hover:ml-5 transition-all duration-300"
        }  hover:ml-0 transition-all duration-200 task-selector task-shadows xl:w-[100%] lg:w-[100%] w-full border-b-1 py-2 px-3 flex flex-col bg-neutral-800 `}
      >
        {/* <h3 className="bg-transparent my-1 text-end">{author}</h3> */}

        <div className="flex py-1">
          <ProjectAssignBtn
            taskId={id}
            projectIdOfTask={projectId}
            minimise={minimise}
          ></ProjectAssignBtn>

          <div
            className={`
            flex justify-end py-1 pl-1 relative dark:bg-neutral-900 ${
              minimise && onHover
            }`}
          >
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
          className={`py-1 px-2 text-md font-medium ${
            minimise && "bg-transparent text-neutral-400"
          }`}
        ></input>
        {minimise && (
          <p className=" px-2 text-sm  text-rose-300">
            {minimise && format(new Date(date), "EEE MMM d")}
          </p>
        )}

        {!minimise && (
          <>
            <motion.textarea
              {...motionProps}
              className=" text-sm font-light origin-bottom  px-2 py-1 min-h-35 border-y-1"
              value={select ? state.newContent : content}
              onChange={(e) =>
                dispatch({
                  type: "change-values",
                  propContent: e.target.value,
                })
              }
              onClick={() => setSelect(true)}
            ></motion.textarea>

            <div
              {...motionProps}
              className="relative"
              onClick={() => setShowTimeOptions(showTimeOptions ? false : true)}
            >
              {format(new Date(date), "EEE MMM d")}
            </div>
            <div>
              {showTimeOptions && (
                <TimeOptions
                  setQuickDate={setQuickDate}
                  trueDate={date}
                  setShowTimeOptions={setShowTimeOptions}
                  callApi={updateTask}
                ></TimeOptions>
              )}
            </div>

            <motion.div {...motionProps} className="flex py-1 ">
              <div className="w-2/4 dark:bg-neutral-900">
                <button
                  onClick={() => {
                    updateTask(quickDate);
                  }}
                  type="submit"
                  className="flex py-1 px-2"
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

// <motion.input
//   type="datetime-local"
//   min={`${currentDate}`}
//   max={`${getYear()}-12-31T23:59`}
//   value={
//     select
//       ? state.newDate
//       : format(new Date(date), "yyyy-MM-dd'T'HH:mm")
//   }
//   onChange={(e) => {
//     dispatch({ type: "change-values", propDate: e.target.value });
//   }}
//   onClick={() => {
//     setSelect(true);
//   }}
//   className="py-1 px-2 relative"
// ></motion.input>

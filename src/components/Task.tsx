"use client";

import ProjectAssignBtn from "./buttons/ProjectAssignBtn";
import RemoveTaskBtn from "./buttons/RemoveTaskBtn";
import { useContext, useEffect, useReducer, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PriorityBtn from "./buttons/PriorityBtn";
import {
  CheckCircleIcon,
  CheckIcon,
  PencilSquareIcon,
  PencilIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import MinimiseTaskBtn from "./buttons/MinimiseTaskBtn";
import { motion } from "motion/react";
import { DashBoardContext } from "@/context/DashBoardContext";
import { format } from "date-fns";
import TimeOptions from "./TimeOptions";
import { transform } from "next/dist/build/swc/generated-native";
import SaveOnchange from "./SaveOnchange";
import { createPortal } from "react-dom";

interface Props {
  author: string | null | undefined;
  title: string;
  date: Date;
  content: string | null;
  id: string;
  priority: boolean;
  projectId: string | null;
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
  const [minimise, setMinimise] = useState(true);
  const [status, setStatus] = useState("initial");
  const [onHover, setOnHover] = useState(
    minimise && `opacity-0 hover:opacity-100`
  );
  const [parentHover, setParentHover] = useState(false);
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [localPriorityState, setLocalPriorityState] = useState(priority);

  const formattedTrueDate = format(new Date(date), "yyyy-MM-dd'T'HH:mm");

  const [state, dispatch] = useReducer(reducer, {
    newTitle: `${title}`,
    newContent: `${content}`,
    newDate: `${formattedTrueDate}`,
  });

  const [quickDate, setQuickDate] = useState<Date>(date);
  const [editing, setEditing] = useState(false);

  const context = useContext(DashBoardContext);

  if (!context) {
    throw new Error("dashboard props not loaded");
  }
  const { globalMinimised, setGlobalMinimised } = context;

  const prevState = useRef(state);

  useEffect(() => {
    if (state !== prevState.current) {
      setEditing(true);
    }

    const debounce = setTimeout(() => {
      if (state !== prevState.current) {
        updateTask(quickDate);
        // setEditing(false);
      }
    }, 400);

    const UIEdit = setTimeout(() => {
      setEditing(false);
    }, 600);

    return () => {
      clearTimeout(debounce);
      clearTimeout(UIEdit);
    };
  }, [state]);

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
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <motion.div
        onHoverStart={() => {
          setOnHover("");
          setParentHover(true);
        }}
        onHoverEnd={() => {
          setOnHover("opacity-0 hover:opacity-100");
          setParentHover(false);
        }}
        id={id}
        initial={!minimise && { height: 500 }}
        transition={{ duration: 0.3 }}
        animate={minimise ? { height: 90 } : { height: 280 }}
        //please just be aware of this p offset if layout problems
        className={`origin-top all-tasks tasks-custom-breakpoint  pt-1 ${
          minimise
            ? "origin-top hello lg:hover:ml-5 md:hover:ml-3 hover:ml-2 transition-all duration-300"
            : "pl-4"
        }  hover:ml-0 transition-all duration-200 task-selector task-shadows xl:w-[100%] lg:w-[100%] w-full border-b-1 border-dotted  px-3 flex flex-col`}
      >
        <div className="flex  relative py-1">
          <ProjectAssignBtn
            taskId={id}
            projectIdOfTask={projectId}
            minimise={minimise}
            parentHover={parentHover}
          ></ProjectAssignBtn>

          <div
            className={`
            absolute top-1 right-0 z-10 flex justify-end pl-1   ${
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
        {minimise ? (
          <button
            onClick={() => {
              setMinimise(false);
              setSelect(true);
            }}
            className={`py-1   w-full text-start text-sm px-2 text-scaley-base  font-medium overflow-hidden whitespace-nowrap text-ellipsis   ${
              minimise && "-mt-2 bg-transparent text-neutral-400"
            }`}
          >
            {state.newTitle}
          </button>
        ) : (
          <motion.input
            maxLength={25}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            value={select ? state.newTitle : title}
            onChange={(e) => {
              dispatch({ type: "change-values", propTitle: e.target.value });
            }}
            onClick={() => setSelect(true)}
            type="text"
            className={`rounded-t-lg text-scaley-base text-neutral-400 ${
              !editing ? "" : `inset-shadow-sm inset-shadow-rose-600`
            } py-1 px-2 text-scaley-base font-medium origin-top ${
              minimise ? "-mt-2 bg-transparent text-neutral-400" : "mt-1"
            }`}
          ></motion.input>
        )}
        {minimise && (
          <button
            onClick={() => setMinimise(false)}
            className=" text-start text-sm px-2 text-scaley-sm text-rose-300"
          >
            {minimise && format(new Date(quickDate), "EEE MMM d")}
          </button>
        )}
        {!minimise && (
          <>
            <motion.textarea
              maxLength={500}
              // {...motionProps}
              transition={{ duration: 0.3, delay: 0.2 }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              className={`rounded-b-xl text-scaley-sm ${
                editing && select ? `inset-shadow-sm inset-shadow-rose-600` : ""
              } text-scaley-sm  font-light origin-top px-2 py-1 h-[clamp(2rem,13vh,10rem)]`}
              value={select ? state.newContent : content}
              onChange={(e) =>
                dispatch({
                  type: "change-values",
                  propContent: e.target.value,
                })
              }
              onClick={() => setSelect(true)}
            ></motion.textarea>

            <motion.button
              transition={{ duration: 0.3, delay: 0.4 }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              className="relative flex border-1 w-full text-left p-1 mt-2  hover:text-rose-600 "
              onClick={() => setShowTimeOptions(showTimeOptions ? false : true)}
            >
              <CalendarDaysIcon className="mr-1 w-5" />
              {format(new Date(quickDate), "EEE MMM d")}
            </motion.button>
            <motion.div className="relative z-100">
              {showTimeOptions &&
                createPortal(
                  <>
                    <div
                      onClick={() => setShowTimeOptions(false)}
                      className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%] z-50 left-[50%] w-full h-full translate-[-50%]`}
                    ></div>
                    <div className="fixed w-100 h-70 top-[50%] left-[50%] z-100 translate-[-50%] bg-transparent">
                      <TimeOptions
                        setQuickDate={setQuickDate}
                        trueDate={date}
                        setShowTimeOptions={setShowTimeOptions}
                        callApi={updateTask}
                      />
                    </div>
                  </>,
                  document.body
                )}
            </motion.div>

            <motion.div
              // {...motionProps}
              transition={{ duration: 0.3, delay: 0.5 }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              className="flex py-1.5 relative z-20"
            >
              <SaveOnchange editing={editing} />
              <PriorityBtn
                id={id}
                priorityState={priority}
                localPriorityState={localPriorityState}
                setLocalPriorityState={setLocalPriorityState}
              ></PriorityBtn>
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

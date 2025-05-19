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
        animate={minimise ? { height: 104 } : { height: 330 }}
        //please just be aware of this p offset if layout problems
        className={`origin-top all-tasks  ${
          minimise
            ? "origin-top hello lg:hover:ml-5 md:hover:ml-3 hover:ml-2 transition-all duration-300"
            : "pl-4"
        }  hover:ml-0 transition-all duration-200 task-selector task-shadows xl:w-[100%] lg:w-[100%] w-full border-b-1 border-dotted py-2 px-3 flex flex-col`}
      >
        <div className="flex py-1">
          <ProjectAssignBtn
            taskId={id}
            projectIdOfTask={projectId}
            minimise={minimise}
            parentHover={parentHover}
          ></ProjectAssignBtn>

          <div
            className={`
            flex justify-end py-1 pl-1 relative  ${minimise && onHover}`}
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
          <p
            onClick={() => setSelect(true)}
            className={`py-1 px-2 text-md font-medium overflow-hidden whitespace-nowrap text-ellipsis w-42 lg:w-60  ${
              minimise && "-mt-2 bg-transparent text-neutral-400"
            }`}
          >
            {state.newTitle}
          </p>
        ) : (
          <motion.input
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            value={select ? state.newTitle : title}
            onChange={(e) => {
              dispatch({ type: "change-values", propTitle: e.target.value });
            }}
            onClick={() => setSelect(true)}
            type="text"
            className={`rounded-t-lg text-md text-neutral-400 ${
              !editing ? "" : `inset-shadow-sm inset-shadow-rose-600`
            } py-1 px-2 text-md font-medium origin-top ${
              minimise && "-mt-2 bg-transparent text-neutral-400"
            }`}
          ></motion.input>
        )}
        {minimise && (
          <p className=" px-2 text-sm text-rose-300">
            {minimise && format(new Date(quickDate), "EEE MMM d")}
          </p>
        )}
        {/* `$
        {!editing
          ? "bg-neutral-900 min-h-35 "
          : `text-sm font-light origin-top px-2 py-1 min-h-35 =`}
        ` */}
        {!minimise && (
          <>
            <motion.textarea
              // {...motionProps}
              transition={{ duration: 0.3, delay: 0.2 }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              className={`rounded-b-xl text-sm ${
                editing && select
                  ? `inset-shadow-sm  inset-shadow-rose-600`
                  : ""
              } text-sm  font-light origin-top px-2 py-1 min-h-35`}
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
              className="relative flex border-1 w-full text-left p-1 mt-2"
              onClick={() => setShowTimeOptions(showTimeOptions ? false : true)}
            >
              <CalendarDaysIcon className="mr-1 w-5" />
              {format(new Date(quickDate), "EEE MMM d")}
            </motion.button>
            <motion.div>
              {showTimeOptions && (
                <TimeOptions
                  setQuickDate={setQuickDate}
                  trueDate={date}
                  setShowTimeOptions={setShowTimeOptions}
                  callApi={updateTask}
                ></TimeOptions>
              )}
            </motion.div>

            <motion.div
              // {...motionProps}
              transition={{ duration: 0.3, delay: 0.5 }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              className="flex py-1.5 "
            >
              <div className="w-2/4">
                <div
                  onClick={() => {
                    updateTask(quickDate);
                  }}
                  className="flex py-1 px-2  w-22 h-8 justify-center align-middle items-center"
                >
                  {editing ? (
                    <div className="flex w-20  ">
                      <div className="w-10 origin-left ">
                        <motion.div
                          transition={{ duration: 0.9 }}
                          initial={{ width: 5 }}
                          animate={{ width: 30 }}
                          className=" w-10 h-5 overflow-hidden origin-right"
                        >
                          . . .
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mr-2 flex"
                      >
                        <PencilIcon className=" w-4 stroke-rose-400 " />
                      </motion.div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex origin-right"
                    >
                      Saved
                      <motion.div
                        initial={{ scale: 2 }}
                        animate={{ scale: 1 }}
                        className="ml-2 flex"
                      >
                        <CheckCircleIcon className=" stroke-green-400" />
                      </motion.div>
                    </motion.div>
                  )}
                  {/* Saved */}
                </div>
              </div>
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

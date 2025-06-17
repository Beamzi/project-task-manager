"use client";

import ProjectAssignBtn from "./buttons/ProjectAssignBtn";
import RemoveTaskBtn from "./buttons/RemoveTaskBtn";
import {
  useContext,
  useEffect,
  useReducer,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/navigation";
import PriorityBtn from "./buttons/PriorityBtn";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import MinimiseTaskBtn from "./buttons/MinimiseTaskBtn";
import { motion } from "motion/react";
import { DashBoardContext } from "@/context/DashBoardContext";
import { format } from "date-fns";
import TimeOptions from "./TimeOptions";
import SaveOnchange from "./SaveOnchange";
import { createPortal } from "react-dom";
import { TaskContext } from "@/context/TaskContext";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import { LuCircleUserRound, LuBox } from "react-icons/lu";

interface Props {
  author?: string | null | undefined;
  title: string;
  date: Date;
  content: string | null;
  id?: string;
  priority?: boolean;
  projectId?: string | null;
  setAllTasksClient: Dispatch<SetStateAction<getAllTasksTypeOf[]>>;
  initMaximise?: boolean;
}

interface TaskState {
  newTitle: string;
  newContent: string | null;
  newDate: string;
}

type TaskAction = {
  type: "change-values";
  propTitle?: string;
  propContent?: string | null;
  propDate?: string;
};

function reducer(state: TaskState, action: TaskAction) {
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
  initMaximise,
  setAllTasksClient,
}: Props) {
  const router = useRouter();
  const [select, setSelect] = useState(false);
  const [minimise, setMinimise] = useState(initMaximise ? false : true);
  const [status, setStatus] = useState("initial");

  const [parentHover, setParentHover] = useState(false);
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [localPriorityState, setLocalPriorityState] = useState(
    priority ?? false
  );

  const formattedTrueDate = format(new Date(date), "yyyy-MM-dd'T'HH:mm");
  const [hideInClient, setHideInClient] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    newTitle: `${title}`,
    newContent: `${content}`,
    newDate: `${formattedTrueDate}`,
  });

  const [quickDate, setQuickDate] = useState<Date>(date);
  const [editing, setEditing] = useState(false);

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) {
    throw new Error("hello");
  }
  // const { setAllTasksClient, allTasksClient } = tasksContext;

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
      const request = await fetch("/api/update-task", {
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

      setAllTasksClient((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                title: state.newTitle,
                content: state.newContent,
                date: scopedDate,
              }
            : item
        )
      );
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {/* ${hideInClient && "hidden"} */}
      <div className={` ${hideInClient && "hidden"} relative`}>
        <motion.div
          id={id}
          initial={!minimise && { height: 500 }}
          transition={{ duration: 0.3 }}
          animate={minimise ? { height: 40 } : { height: 280 }}
          //please just be aware of this p offset if layout problems
          className={`origin-top ${
            minimise && "hover:bg-neutral-700/50"
          } rounded-lg  all-tasks tasks-custom-breakpoint ${
            minimise
              ? "origin-top hello lg:hover:ml-5 md:hover:ml-3 hover:ml-2 transition-all duration-300"
              : "md:pl-4"
          } hover:ml-0 transition-all duration-200 task-selector task-shadows xl:w-[100%] lg:w-[100%] w-full border-b-1 border-neutral-700/50 border-dotted md:px-3 flex flex-col`}
        >
          <div className="flex border-b-1 border-dotted border-neutral-700/50 ">
            <div
              className={`
            absolute top-1 py-1 right-0 z-10 flex justify-end pl-1  
            `}
            >
              {!initMaximise && !minimise && (
                <MinimiseTaskBtn
                  id={id}
                  setMinimise={setMinimise}
                  minimise={minimise}
                  status={status}
                  setStatus={setStatus}
                ></MinimiseTaskBtn>
              )}

              {!minimise && (
                <RemoveTaskBtn
                  id={id}
                  setHideInClient={setHideInClient}
                  setAllTasksClient={setAllTasksClient}
                ></RemoveTaskBtn>
              )}
            </div>
          </div>

          <div className="flex py-1  justify-between items-center">
            <div className="flex  w-full  justify-start  align-middle content-start">
              <ProjectAssignBtn
                taskId={id}
                projectIdOfTask={projectId}
                minimise={minimise}
                parentHover={parentHover}
              ></ProjectAssignBtn>
              {minimise && (
                <button
                  onClick={() => {
                    setMinimise(false);
                    setSelect(true);
                  }}
                  className={` w-[80%]  text-start text-sm px-2 font-medium overflow-hidden whitespace-nowrap text-ellipsis ${
                    minimise && " bg-transparent text-neutral-300"
                  }`}
                >
                  {state.newTitle}
                </button>
              )}
            </div>

            {minimise && (
              <div className="flex">
                <button
                  onClick={() => setMinimise(false)}
                  className=" min-w-17  text-end text-sm px-2 text-scaley-sm  text-rose-300"
                >
                  {minimise && format(new Date(quickDate), "MMM d")}
                </button>
                <LuCircleUserRound className="w-5 h-5 stroke-neutral-600" />
              </div>
            )}
          </div>
          {!minimise && (
            <>
              <motion.input
                maxLength={25}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                value={select ? state.newTitle : title}
                onChange={(e) => {
                  dispatch({
                    type: "change-values",
                    propTitle: e.target.value,
                  });
                }}
                onClick={() => setSelect(true)}
                type="text"
                className={`rounded-t-lg  w-full  text-scaley-base text-neutral-400 ${
                  !editing ? "" : `inset-shadow-sm inset-shadow-rose-600`
                } py-1 px-2 text-scaley-base font-medium origin-top ${
                  minimise ? "-mt-2 bg-transparent text-neutral-400" : "mt-1"
                }`}
              ></motion.input>

              <motion.textarea
                maxLength={500}
                // {...motionProps}
                transition={{ duration: 0.3, delay: 0.2 }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                className={`rounded-b-xl text-scaley-sm ${
                  editing && select
                    ? `inset-shadow-sm inset-shadow-rose-600`
                    : ""
                } text-scaley-sm font-light origin-top px-2 py-1 h-[clamp(2rem,13vh,10rem)]`}
                value={(select ? state.newContent : content) ?? ""}
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
                className="relative flex border-1 w-full text-left p-1 mt-2 hover:text-rose-600 "
                onClick={() =>
                  setShowTimeOptions(showTimeOptions ? false : true)
                }
              >
                <CalendarDaysIcon className="mr-1 w-5" />
                {format(new Date(quickDate), "EEE MMM d")}
              </motion.button>
              <motion.div className="relative z-100 ">
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
                className="flex py-1.5 relative z-20 "
              >
                <SaveOnchange editing={editing} />
                <PriorityBtn
                  id={id}
                  priorityState={priority}
                  localPriorityState={localPriorityState}
                  setLocalPriorityState={setLocalPriorityState}
                  setAllTasksClient={setAllTasksClient}
                ></PriorityBtn>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}

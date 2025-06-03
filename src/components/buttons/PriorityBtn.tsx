"use client";

import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import {
  QuestionMarkCircleIcon,
  StarIcon as StarIconOutline,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import Tooltip from "../Tooltip";
import { motion, AnimatePresence } from "motion/react";
import { DashBoardContext, TaskInput } from "@/context/DashBoardContext";
import { TaskContext } from "@/context/TaskContext";

export default function PriorityBtn({
  id,
  priorityState,
  localPriorityState,
  setLocalPriorityState,
}: {
  id?: string;
  priorityState?: boolean;
  localPriorityState?: boolean;
  setLocalPriorityState: (value: boolean) => void;
}) {
  // const [localPriorityState, setLocalPriorityState] = useState(priorityState);

  // const context = useContext(DashBoardContext);
  // if (!context) throw new Error("asasdas");
  // const { newTaskValues, setNewTaskValues } = context;

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) {
    throw new Error("hello");
  }
  const { setAllTasksClient, allTasksClient } = tasksContext;

  const [toggleItem, setToggleItem] = useState("");
  const [unpriority, setUnpriority] = useState(false);
  const [tipReveal, setTipReveal] = useState(false);
  const [restart, setRestart] = useState(false);
  const [onInteraction, setOnInteraction] = useState(false);

  useEffect(() => {
    const item = allTasksClient.find((t) => t.id === id);
    if (item) {
      setLocalPriorityState(item.priority ?? false);
    }
  }, [id, allTasksClient]);

  async function makePriority(value: boolean) {
    try {
      await fetch("/api/priority-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priority: value, id: id }),
      });

      setAllTasksClient((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, priority: value } : item
        )
      );
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="z-5 py-0.5 flex w-2/4 justify-end relative ">
      <motion.button
        //keep an eye on this
        key={restart ? "restart" : "normal"}
        initial={restart && { opacity: 0.5, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1, transition: { duration: 0.2 } }}
        whileTap={
          localPriorityState
            ? undefined
            : {
                scale: 0.8,
              }
        }
        className={`w-20 flex justify-center ml-2 border-1  ${
          (localPriorityState && "asd") ||
          "hover:[&>*]:fill-rose-600 hover:[&>*]:stroke-rose-600 transition-all duration-100 hover:border-x-5 hover:[&>*]:scale-120"
        }`}
        onClick={() => {
          makePriority(true);
          setLocalPriorityState(true);
          setOnInteraction(true);
          requestAnimationFrame(() => {
            setOnInteraction(false);
          });
        }}
      >
        {localPriorityState ? (
          <>
            <StarIconSolid
              className={`fill-rose-600 transition-all duration-300
              `}
            />
          </>
        ) : (
          <StarIconOutline className="transition-all duration-300" />
        )}
        {/* {localPriorityState ? "prioritised"  : "priority"} */}
      </motion.button>
      <div
        onMouseEnter={() => setTipReveal(true)}
        onMouseLeave={() => setTipReveal(false)}
        className={`select- none w-5 ml-2 px-4 text-center flex flex-col relative items-center justify-center ${
          (localPriorityState &&
            `${
              (unpriority && "border-1 border-transparent") ||
              " hover:bg-neutral-900 transition-all duration-300 border-x-1 rounded-sm"
            }  border-transparent`) ||
          `unselected rounded-sm  border-1 `
        } `}
      >
        {tipReveal && !localPriorityState ? (
          <Tooltip className=""></Tooltip>
        ) : null}
        {!localPriorityState && (
          <QuestionMarkCircleIcon className="h-full stroke-neutral-300 rounded-" />
        )}
        {localPriorityState && (
          // init is intentionally specific to a single event
          <motion.ul
            initial={onInteraction ? { scale: 0 } : false}
            animate={{ scale: 1 }}
            onClick={() => {
              setUnpriority(true);
              toggleItem === "visible"
                ? setToggleItem("invisible")
                : setToggleItem("visible");
            }}
            className={`h-full "[&>*]:fill-neutral-100 ${
              toggleItem === "visible"
                ? "[&>*]:fill-rose-600 bg-transparent "
                : "[&>*]:fill-white bg-transparent"
            }`}
          >
            <ChevronDownIcon className="h-full bg-transparent hover:scale-140 transition-all duration-300 " />
            {unpriority && (
              <li
                className={`${toggleItem} invisible absolute top-0, -bottom-14 right-0 -left-19 bg-neutral-800 shadow-lg/50 dark:shadow-rose-600/50`}
              >
                <AnimatePresence>
                  {toggleItem === "visible" && (
                    <motion.button
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      whileTap={{
                        //opacity: 0,
                        scaleX: 0.5,
                        transition: { duration: 0.1 },
                      }}
                      exit={{
                        opacity: 0,
                        scaleY: 0,
                        transition: { duration: 0.2 },
                      }}
                      onAnimationComplete={() => {}}
                      onClick={() => {
                        makePriority(false);
                        setTipReveal(false);
                        setRestart(true);
                        setUnpriority(false);

                        setTimeout(() => {
                          setLocalPriorityState(false);
                          setRestart(false);
                        }, 100);
                      }}
                      className={`${toggleItem} p-3 hover:bg-neutral-800 hover:text-rose-600 hover:outline-1`}
                    >
                      unprioritise?
                    </motion.button>
                  )}
                </AnimatePresence>
              </li>
            )}
          </motion.ul>
        )}
      </div>
    </div>
  );
}

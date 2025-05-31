"use client";

import React from "react";
import Task from "../Task";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import { useContext, useEffect, useRef } from "react";
import { DashBoardContext } from "@/context/DashBoardContext";
interface NewProps {
  currentTasks: getAllTasksTypeOf[] | undefined;
}

export default function ListOfTasks({ currentTasks }: NewProps) {
  const dashboardProps = useContext(DashBoardContext);

  if (!dashboardProps) {
    throw new Error("dashboard context not loaded");
  }

  const { newTaskValues, newTaskFlag, setNewTaskFlag } = dashboardProps;

  const prevLength = useRef(currentTasks?.length || 0);

  useEffect(() => {
    const currentLength = currentTasks?.length || 0;
    const prevLengthRef = prevLength.current;

    if (prevLengthRef < currentLength) {
      setNewTaskFlag(false);
    }

    prevLength.current = currentLength;
  }, [currentTasks, prevLength]);

  return (
    <>
      {newTaskFlag && (
        <Task
          // author={"temp"}
          title={newTaskValues.title}
          date={newTaskValues.date}
          content={newTaskValues.content}
          // id={"temp"}
          priority={false}
          // projectId={"temp"}
        />
      )}

      {currentTasks?.map((item) => (
        <Task
          key={item.id}
          author={item.author?.name}
          title={item.title}
          date={item.date}
          content={item.content}
          id={item.id}
          priority={item.priority}
          projectId={item.projectId}
        ></Task>
      ))}
    </>
  );
}

// const prevLengthRef = useRef(currentTasks?.length || 0);

// useEffect(() => {
//   const currentLength = currentTasks?.length || 0;
//   const prevLength = prevLengthRef.current;

//   if (currentLength > prevLength) {
//     setNewTaskFlag(false);
//   }
//   prevLengthRef.current = currentLength;
// }, [currentTasks, newTaskFlag]);

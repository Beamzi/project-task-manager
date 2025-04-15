"use client";

import { TaskContext } from "@/context/TaskContext";
import React, { useContext } from "react";
import ListOfTasks from "./Lists/ListOfTasks";

export default function AllTasks() {
  const tasks = useContext(TaskContext);

  return (
    <>
      <ListOfTasks currentTasks={tasks}></ListOfTasks>
    </>
  );
}

//toLocaleDateString();

//{item.date.toLocaleString()}

/*"use client";

import { TaskContext } from "@/context/TaskContext";
import React, { useContext } from "react";
import { format } from "date-fns";

export default function AllTasks({}) {
  const tasks = useContext(TaskContext);
  if (!tasks) return null;
  return (
    <>
      {tasks.map((item) => (
        <div key={item.id}>
          <h3>{item.author?.name}</h3>
          <h1>{item.title}</h1>
          <p>{format(new Date(item.date), "dd/MM/yyyy")}</p>
          <p>{item.content}</p>
        </div>
      ))}
    </>
  );
}
*/

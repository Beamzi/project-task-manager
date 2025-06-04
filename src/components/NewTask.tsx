"use client";

import { format } from "date-fns";

import { FormEvent } from "react";
import { useContext, useState } from "react";
import TimeOptions from "./TimeOptions";
import { projectContext } from "@/context/ProjectContext";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import {
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { DashBoardContext } from "@/context/DashBoardContext";
import { TaskContext } from "@/context/TaskContext";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
interface Props {
  setShowForm: (type: boolean) => void;
  fixedDate?: Date;
}

export default function NewTask({ setShowForm, fixedDate }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isNewTask, setIsNewTask] = useState(false);
  const trueDate = new Date();

  const [quickDate, setQuickDate] = useState<Date>(
    fixedDate ? fixedDate : trueDate
  );
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [newTaskProjectId, setNewTaskProjectId] = useState("");
  const [showProjects, setShowProjects] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");

  const projects = useContext(projectContext);
  if (!projects) throw new Error("projects not loaded");

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) {
    throw new Error("hello");
  }
  const { setAllTasksClient, allTasksClient } = tasksContext;

  async function createTask(event: FormEvent<HTMLFormElement>, tempId: string) {
    event.preventDefault();
    try {
      const request = await fetch("/api/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          date: quickDate,
          projectId: newTaskProjectId ? newTaskProjectId : undefined,
          createdAt: new Date(),
        }),
      });

      const response = await request.json();
      setAllTasksClient((prev) =>
        prev.map((item) =>
          item.id === tempId ? { ...item, id: response.result.id } : item
        )
      );

      // setNewTaskResponse((prev) => [...prev, response.result]);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        const tempId = crypto.randomUUID();

        setAllTasksClient((prev) => [
          ...prev,
          {
            title: title,
            content: content,
            date: quickDate,
            id: tempId,
            createdAt: new Date(),
          } as getAllTasksTypeOf,
        ]);

        createTask(e, tempId);
        setShowForm(false);
      }}
      className="new-task-local-scope"
    >
      <div
        onClick={() => setShowForm(false)}
        className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%] z-50 left-[50%] w-full h-full translate-[-50%]`}
      ></div>
      <div className="fixed md:w-120 min-w-80 top-[50%] left-[50%] z-100 translate-[-50%]  flex flex-col p-5 gradient-for-inner-containers border-1 rounded-xl outline-4 -outline-offset-5 outline-neutral-900">
        <input
          value={title}
          required
          minLength={1}
          maxLength={25}
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
          className=" w-full text-lg rounded-t-lg"
          type="text"
        ></input>
        <textarea
          required
          minLength={1}
          maxLength={500}
          value={content}
          placeholder="Description"
          onChange={(event) => setContent(event.target.value)}
          className="w-full rounded-b-lg"
        ></textarea>
        <div className="flex py-2">
          <button
            type="button"
            className={`border-1 rounded-lg mr-2 ${
              fixedDate && "pointer-events-none bg-neutral-900 text-neutral-500"
            }`}
            onClick={() => {
              setShowTimeOptions(showTimeOptions ? false : true);
              setIsNewTask(true);
            }}
          >
            <CalendarIcon />

            {fixedDate
              ? `${format(new Date(fixedDate), "eee MMM d")}`
              : isNewTask && !showTimeOptions
              ? `${format(new Date(quickDate), "eee MMM d")}`
              : "Pick A Date"}
          </button>
          <div>
            {showTimeOptions && (
              <TimeOptions
                quickDate={quickDate}
                setQuickDate={setQuickDate}
                trueDate={trueDate}
                setShowTimeOptions={setShowTimeOptions}
                isNewTask={isNewTask}
              ></TimeOptions>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              className="border-1 rounded-lg"
              onClick={() => setShowProjects(showProjects ? false : true)}
            >
              <ListBulletIcon />
              {projectTitle ? `${projectTitle}` : "Projects"}
            </button>
            {showProjects && (
              <ul className="absolute top-11 -left-1 px-1 py-1 bg-black rounded-xl border-1 ">
                {projects.length === 0 ? (
                  <li>
                    <div className="w-70 pointer-events-none px-1 py-1 hover:text-neutral-300 flex flex-col bg-black text-left">
                      <p>
                        You have no projects; create a project in the dashboard
                        by selecting:
                        <span className="flex my-2 text-md ">
                          <PlusIcon className="stroke-green-500" />
                          New Project
                        </span>
                      </p>
                    </div>
                  </li>
                ) : (
                  projects.map((item) => (
                    <li key={item.id} className="w-full">
                      <button
                        type="button"
                        onClick={() => {
                          setNewTaskProjectId(item.id);
                          setShowProjects(false);
                          setProjectTitle(item.title);
                        }}
                        className="w-full"
                      >
                        {item.title}
                      </button>
                    </li>
                  ))
                )}

                {}
              </ul>
            )}
          </div>
        </div>
        <div className="flex">
          <button
            type="submit"
            className="border-1 rounded-lg w-1/2 mr-2 text-center py-2"
          >
            <CheckCircleIcon />
            Submit
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="border-1 rounded-lg w-1/2 "
          >
            <XCircleIcon />
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

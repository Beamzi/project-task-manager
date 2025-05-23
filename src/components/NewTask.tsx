"use client";

import { format } from "date-fns";

import { useRouter } from "next/navigation";
import { createElement, useContext, useState } from "react";
import TimeOptions from "./TimeOptions";
import { projectContext } from "@/context/ProjectContext";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
interface Props {
  setShowForm: (type: boolean) => void;
}

export default function NewTask({ setShowForm }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isNewTask, setIsNewTask] = useState(false);
  const trueDate = new Date();

  const [quickDate, setQuickDate] = useState<Date>(trueDate);
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [newTaskProjectId, setNewTaskProjectId] = useState("");
  const [showProjects, setShowProjects] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");

  const projects = useContext(projectContext);
  if (!projects) throw new Error("projects not loaded");

  async function createTask(event) {
    event.preventDefault();
    try {
      await fetch("/api/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          date: quickDate,
          projectId: newTaskProjectId ? newTaskProjectId : undefined,
        }),
      });
      // router.refresh();
    } catch (e) {
      console.error(e);
    }
  }

  const getYear = () => new Date().getFullYear();

  const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  console.log(currentDate, "current date");

  console.log(getYear, "current year bla");

  return (
    <form
      onSubmit={(e) => {
        createTask(e);
        setShowForm(false);
      }}
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
            className="border-1 rounded-lg mr-2"
            onClick={() => {
              setShowTimeOptions(showTimeOptions ? false : true);
              setIsNewTask(true);
            }}
          >
            <CalendarIcon />

            {isNewTask && !showTimeOptions
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
            onClick={(e) => {
              // createTask(e);
              // setShowForm(false);
            }}
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

//9999-12-31T23:59

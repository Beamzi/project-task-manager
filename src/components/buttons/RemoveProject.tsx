"use client";

import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { DashBoardContext } from "@/context/DashBoardContext";
import { redirect } from "next/navigation";
import { GetAllProjecttypeOf } from "@/lib/queries/getAllProjects";
import { AllProjectsContext } from "@/context/AllProjectsContext";
import { ParamValue } from "next/dist/server/request/params";
import { useRouter } from "next/navigation";

export default function RemoveProject({
  project,
  allProjectsClient,
  setAllProjectsClient,
}: {
  project: GetAllProjecttypeOf;
  allProjectsClient?: GetAllProjecttypeOf[];
  setAllProjectsClient: Dispatch<SetStateAction<GetAllProjecttypeOf[]>>;
}) {
  const [showDelete, setShowDelete] = useState(false);

  async function deleteProject() {
    try {
      await fetch("/api/delete-project", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId: project.id }),
      });

      setAllProjectsClient((prev) =>
        prev.filter((item) => item.id !== project.id)
      );
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteCommentsOfProject() {
    try {
      await fetch("/api/batch-delete-project-comments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project.id,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("dashboard props not loaded");
  }

  const { setRemoveProjectFromDashboard, removeProjectFromDashboard } = context;
  return (
    <div className="relative ">
      <button
        className="border-1 w-10 flex justify-center items-center content-center px-2 py-1 rounded-lg"
        onClick={() => {
          setShowDelete(showDelete ? false : true);
        }}
      >
        <MinusCircleIcon className="w-6" />
      </button>
      {showDelete && (
        <div className="absolute top-12 z-100 p-3 -right-2 border-1 bg-black rounded-xl w-50">
          <p className="">Are you sure you want to delete this project?</p>
          <div className="flex mt-2">
            <button
              onClick={() => {
                setRemoveProjectFromDashboard([
                  ...removeProjectFromDashboard,
                  project.id,
                ]);

                deleteCommentsOfProject();
                setTimeout(() => {
                  deleteProject();
                  redirect("/");
                });
              }}
              className="border-1 rounded-md p-2 mr-2 w-full hover:bg-white hover:text-rose-600 transition-colors duration-50"
            >
              Yes
            </button>
            <button
              onClick={() => setShowDelete(false)}
              className="hover:bg-white hover:text-rose-600 transition-colors duration-50 border-1 rounded-md p-2 w-full"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

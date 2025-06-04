"use client";

import { AllProjectsContext } from "@/context/AllProjectsContext";
import React from "react";
import { useContext } from "react";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import ProjectView from "@/components/ProjectView";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";

import RemoveProject from "@/components/buttons/RemoveProject";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { SessionContext } from "@/context/SessionContext";
import { useParams } from "next/navigation";
import { DashBoardContext } from "@/context/DashBoardContext";
import { TaskContext } from "@/context/TaskContext";

export default function ProjectDynamic() {
  const params = useParams();
  const id = params.id;
  const allProjects = useContext(AllProjectsContext);
  const session = useContext(SessionContext);

  if (!allProjects) {
    throw new Error("projects not loaded");
  }
  if (!session) {
    throw new Error("session lot loaded");
  }

  const { setAllProjectsClient, allProjectsClient } = allProjects;

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) throw new Error("tasks not loaded");
  const { setAllTasksClient, allTasksClient } = tasksContext;

  const currentProjectId = allProjectsClient.findIndex((p) => p.id === id);
  const project = allProjectsClient[currentProjectId];
  //const tasks = project.tasks;
  const comments = project.comments;
  const profileImg = session?.user?.image;

  const allTasksClientCopy = [...allTasksClient];

  const projectAssignedTasks = allTasksClientCopy.filter(
    (item) => item.projectId === id
  );

  return (
    <>
      <section className="project-page-view w-full px-[clamp(16px,2vw,24px)] 2xl:w-[70%] xl:w-[80%]">
        <div className=" gradient-for-thin-containers border-1 flex justify-end rounded-xl py-2 px-2 outline-4 -outline-offset-5 outline-neutral-900">
          <button className="border-1 w-10 flex justify-center items-center content-center px-2 py-1 rounded-lg mr-2">
            <UserPlusIcon className="w-6" />
          </button>
          <RemoveProject project={project} />
        </div>
      </section>
      <FirstRowContainers
        leftId={true}
        leftData={
          <ProjectView
            project={project}
            comments={comments}
            profileImg={profileImg}
            setAllProjectsClient={setAllProjectsClient}
          ></ProjectView>
        }
        rightData={
          <ListOfTasks
            allTasksClientCopy={projectAssignedTasks}
            setAllTasksClient={setAllTasksClient}
          />
        }
        height="h-full"
        ifBottomRow={true}
      ></FirstRowContainers>
    </>
  );
}

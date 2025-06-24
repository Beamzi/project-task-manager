"use client";

import { AllProjectsContext } from "@/context/AllProjectsContext";
import React, { useState } from "react";
import { useContext } from "react";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import ProjectView from "@/components/ProjectView";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import RemoveProject from "@/components/buttons/RemoveProject";
import { SessionContext } from "@/context/SessionContext";
import { useParams } from "next/navigation";
import { TaskContext } from "@/context/TaskContext";
import { LuUserPlus } from "react-icons/lu";
import TopBarContainer from "@/components/Skeleton/TopBarContainer";

export default function ProjectDynamic() {
  const params = useParams();
  const id = params.id;
  const allProjects = useContext(AllProjectsContext);
  const session = useContext(SessionContext);

  if (!allProjects) {
    throw new Error("projects not loaded");
  }
  if (!session) {
    throw new Error("session not loaded");
  }

  const { setAllProjectsClient, allProjectsClient } = allProjects;

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) throw new Error("tasks not loaded");
  const { setAllTasksClient, allTasksClient } = tasksContext;

  const [showTeamTooltip, setShowTeamTooltip] = useState(false);

  const currentProjectId = allProjectsClient.findIndex((p) => p.id === id);
  const project = allProjectsClient[currentProjectId];
  const comments = project.comments;
  const profileImg = session?.user?.image;
  const allTasksClientCopy = [...allTasksClient];
  const projectAssignedTasks = allTasksClientCopy.filter(
    (item) => item.projectId === id
  );

  return (
    <>
      <TopBarContainer
        title={project.title}
        data={
          <>
            <button
              onClick={() => setShowTeamTooltip(showTeamTooltip ? false : true)}
              className="border-1 w-10 flex justify-center items-center content-center px-2 py-1 rounded-lg mr-2"
            >
              <LuUserPlus className="w-full h-6" />
            </button>
            {showTeamTooltip && (
              <div className="absolute top-10 right-14 bg-black border-1 w-40 rounded-lg p-2 z-1000 w-">
                <p>Team Collaboration Coming Soon</p>
              </div>
            )}
            <RemoveProject
              project={project}
              allProjectsClient={allProjectsClient}
              setAllProjectsClient={setAllProjectsClient}
            />
          </>
        }
      />

      <FirstRowContainers
        leftId={true}
        leftData={
          <ProjectView
            project={project}
            projectId={id}
            comments={comments}
            profileImg={profileImg}
            allProjectsClient={allProjectsClient}
            setAllProjectsClient={setAllProjectsClient}
          ></ProjectView>
        }
        rightData={
          <ListOfTasks
            isAssigned={true}
            projectId={project.id}
            projectTitle={project.title}
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

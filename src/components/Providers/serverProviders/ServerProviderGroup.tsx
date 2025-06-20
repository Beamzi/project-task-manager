import React from "react";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import AllProjectsProvider from "./AllProjectsProvider";
import AllCommentsProvider from "./AllCommentsProvider";
import { GetAllProjecttypeOf } from "@/lib/queries/getAllProjects";
import { GetAllCommentsTypeof } from "@/lib/queries/getAllComments";
import AllTasksProvider from "./AllTasksProvider";

interface Props {
  allTasks: getAllTasksTypeOf[];
  allProjects: GetAllProjecttypeOf[];
  allComments: GetAllCommentsTypeof[];
  children: React.ReactNode;
}

export default function ServerProviderGroup({
  allTasks,
  allProjects,
  allComments,
  children,
}: Props) {
  return (
    <AllProjectsProvider allProjects={allProjects}>
      <AllCommentsProvider allComments={allComments}>
        <AllTasksProvider allTasks={allTasks}>{children}</AllTasksProvider>
      </AllCommentsProvider>
    </AllProjectsProvider>
  );
}

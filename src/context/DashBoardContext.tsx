import React, { createContext } from "react";
import { RefObject } from "react";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

export interface TaskInput {
  title: string;
  content: string;
  date: Date;
}

interface Props {
  modal: boolean;
  setModal: (value: boolean) => void;
  sideMenu: string;
  setSideMenu: (value: string) => void;
  scrollDivRef: RefObject<HTMLDivElement | null>;
  globalMinimised: boolean;
  setGlobalMinimised: (value: boolean) => void;
  removeProjectFromDashboard: string[];
  setRemoveProjectFromDashboard: React.Dispatch<React.SetStateAction<string[]>>;

  setNewTaskValues: React.Dispatch<React.SetStateAction<TaskInput[]>>;
  newTaskValues: TaskInput[];

  setNewTaskResponse: React.Dispatch<React.SetStateAction<getAllTasksTypeOf[]>>;
  newTaskResponse: getAllTasksTypeOf[];
}
export const DashBoardContext = createContext<Props | null>(null);

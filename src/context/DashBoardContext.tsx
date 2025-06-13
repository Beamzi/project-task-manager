import React, { createContext } from "react";
import { RefObject } from "react";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

interface CommentData {
  content: string;
  createdAt: Date;
  id: string;
}

interface Props {
  modal: boolean;
  setModal: (value: boolean) => void;
  sideMenu: boolean;
  setSideMenu: (value: boolean) => void;
  scrollDivRef: RefObject<HTMLDivElement | null>;
  globalMinimised: boolean;
  setGlobalMinimised: (value: boolean) => void;
  removeProjectFromDashboard: string[];
  setRemoveProjectFromDashboard: React.Dispatch<React.SetStateAction<string[]>>;
  localComment: CommentData[];
  setLocalComment: React.Dispatch<React.SetStateAction<CommentData[]>>;
}

export const DashBoardContext = createContext<Props | null>(null);

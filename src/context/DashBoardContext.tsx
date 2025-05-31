import { createContext } from "react";
import { RefObject } from "react";

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
  newTaskValues: { title: string; content: string; date: Date };
  setNewTaskValues: (value: {
    title: string;
    content: string;
    date: Date;
  }) => void;
  newTaskFlag: boolean;
  setNewTaskFlag: (value: boolean) => void;
}
export const DashBoardContext = createContext<Props | null>(null);

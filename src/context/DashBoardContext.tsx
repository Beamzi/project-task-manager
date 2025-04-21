import { createContext } from "react";
import { RefObject } from "react";

interface Props {
  modal: boolean;
  setModal: (value: boolean) => void;
  sideMenu: string;
  setSideMenu: (value: string) => void;
  taskRef: any;
}
export const DashBoardContext = createContext<Props | null>(null);

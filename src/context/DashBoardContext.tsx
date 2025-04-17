import { createContext } from "react";

interface Props {
  modal: boolean;
  setModal: (value: boolean) => void;
  sideMenu: string;
  setSideMenu: (value: string) => void;
}
export const DashBoardContext = createContext<Props | null>(null);

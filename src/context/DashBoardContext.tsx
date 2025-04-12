import { createContext } from "react";

interface Props {
  modal: boolean;
  setModal: (value: boolean) => void;
}

export const DashBoardContext = createContext<Props | null>(null);

import SideBar from "./SideBar";
import { DashBoardProvider } from "../DashBoardProvider";
import DashBoardOverlay from "./DashBoardOverlay";

export default function DashBoard({ children }: { children: React.ReactNode }) {
  return (
    <DashBoardProvider>
      <DashBoardOverlay />
      <div className="flex border-2 p-5 w-dvw">
        <SideBar />
        {children}
      </div>
    </DashBoardProvider>
  );
}

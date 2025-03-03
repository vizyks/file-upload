import SideBar from "./sidebar";
import Main from "./main";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <main className="bg-black text-white w-screen h-screen flex p-4 gap-4">
        <SideBar />
        <Outlet />
      </main>
    </>
  );
}

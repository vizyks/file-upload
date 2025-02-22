import SideBar from "./dashboard/sidebar";
import Dashboard from "./dashboard/dashboard";
import Main from "./dashboard/main";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Dashboard>
        <SideBar />
        <Main />
      </Dashboard>
    </>
  );
}

export default App;

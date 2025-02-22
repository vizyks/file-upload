import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import {
  HiHome,
  HiUsers,
  HiMail,
  HiLogout,
  HiQuestionMarkCircle,
  HiUserCircle,
} from "react-icons/hi";

export default function SideBar() {
  return (
    <IconContext.Provider value={{ className: "text-purple-accent size-5" }}>
      <div className="w-2xs flex">
        <div className="bg-grey rounded-lg flex-1 flex flex-col p-4">
          <h1 className="text-center text-2xl font-bold pb-4">Warp Files</h1>
          <div className="flex border-b-1 border-t-1 border-grey-ring py-3 items-center justify-center gap-2 font-bold">
            <HiUserCircle className="size-8 text-white" />
            Vizyks
          </div>
          <nav className="flex flex-col py-4 gap-2">
            <ul>
              <li>
                <Link
                  to="/home"
                  className="flex py-1 px-2 rounded-sm hover:bg-grey-hover"
                >
                  <button className="flex gap-2 items-center hover:cursor-pointer">
                    <HiHome /> Home
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  to="/shared"
                  className="flex py-1 px-2 rounded-sm hover:bg-grey-hover"
                >
                  <button className="flex gap-2 items-center hover:cursor-pointer">
                    <HiUsers /> Shared with Me
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex py-1 px-2 rounded-sm hover:bg-grey-hover"
                >
                  <button className="flex gap-2 items-center hover:cursor-pointer">
                    <HiQuestionMarkCircle /> About
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex py-1 px-2 rounded-sm hover:bg-grey-hover"
                >
                  <button className="flex gap-2 items-center hover:cursor-pointer">
                    <HiMail /> Contact
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex gap-2 items-center mt-auto pt-4 border-t-1 border-grey-ring">
            <Link
              to="/logout"
              className="flex flex-1 py-1 px-2 my-[-4px] rounded-sm hover:bg-grey-hover"
            >
              <button className="flex gap-2 items-center hover:cursor-pointer">
                <HiLogout /> Logout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

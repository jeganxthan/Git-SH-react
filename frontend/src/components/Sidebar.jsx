// Sidebar.jsx
import React, { useContext, useState } from "react";
import { sideBarLinks } from "../constants/index";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeftEndOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { UserContext } from "../context/UserProvider";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { updateUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    updateUser(null); 
    navigate("/");
  };
  

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-dark-2 p-4 sm:hidden">
        <h1 className="text-white text-xl font-bold">GIT-SH</h1>
        <button
          aria-label="Toggle Sidebar"
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>
      </div>

      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64 flex-col justify-between
          border-r border-r-dark-4 bg-dark-2 pt-28 pb-5 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          sm:static sm:translate-x-0 sm:flex sm:w-fit
        `}
      >
        <div className="flex justify-center relative">
          <h1 className="text-3xl text-white absolute bottom-10 tracking-wider hidden sm:block">
            GIT-SH
          </h1>
        </div>

        <nav className="flex flex-1 flex-col gap-6 px-6 md:px-4">
          {sideBarLinks.map((item, index) => {
            const Icon = item.logo;
            const isActive = location.pathname === item.route;
            return (
              <button
                key={index}
                onClick={() => {
                  if (item.route) navigate(item.route);
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-3 rounded p-2 ${isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
                  }`}
              >
                <Icon className="w-6 h-6" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-10 px-6">
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-4 p-4 text-white hover:bg-gray-800 rounded"
          >
            <ArrowLeftEndOnRectangleIcon className="h-6 w-6" />
            <span className="hidden sm:inline text-light-2 max-lg:hidden">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;

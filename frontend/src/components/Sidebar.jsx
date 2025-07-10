import React from "react";
import { sideBarLinks } from "../constants/index";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section className="sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r-dark-4 bg-dark-2 pb-5 pt-28">
      <div className="flex justify-center relative">
        <h1 className="text-3xl text-white absolute bottom-10 tracking-wider hidden sm:block">
          GIT-SH
        </h1>
      </div>

      <div className="flex w-[100px] md:w-full flex-1 flex-col gap-6 px-8 md:px-6">
        {sideBarLinks.map((item, index) => {
          const Icon = item.logo;
          const isActive = location.pathname === item.route;

          return (
            <button
              key={index}
              onClick={() => item.route && navigate(item.route)}
              className={`flex items-center space-x-3 p-2 rounded ${
                isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <div className="flex cursor-pointer gap-4 p-4">
          <span className="h-6 w-6 text-white">
            <ArrowLeftEndOnRectangleIcon />
          </span>
          <p className="hidden sm:inline text-light-2 max-lg:hidden">Logout</p>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;

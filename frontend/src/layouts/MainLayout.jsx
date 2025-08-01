import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
     <div className="bg-[#07080a] flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className='bg-black'>
        <Sidebar/>
      </div>
      <div className="flex-grow ml-4 pt-12 md:overflow-y-auto md:p-12"><Outlet /> </div>
    </div>
  );
};

export default MainLayout;

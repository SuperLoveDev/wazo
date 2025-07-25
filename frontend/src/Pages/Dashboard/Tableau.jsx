import React from "react";
import Navbar from "../../Components/DashboardCompo/Navbar";
import Sidebar from "../../Components/DashboardCompo/Sidebar";
import { Outlet } from "react-router-dom";

const Tableau = () => {
  return (
    <div className="rounded-lg bg-gradient-to-r from-purple-200 to-red-200">
      <Navbar />
      <hr className="border-transparent" />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4 bg-white/80">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Tableau;

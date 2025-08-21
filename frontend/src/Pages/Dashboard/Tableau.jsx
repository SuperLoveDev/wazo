import React from "react";
import Navbar from "../../Components/DashboardCompo/Navbar";
import Sidebar from "../../Components/DashboardCompo/Sidebar";
import { Outlet } from "react-router-dom";

const Tableau = () => {
  return (
    <div className="rounded-lg bg-transparent">
      <Navbar />
      <hr className="border-transparent" />
      <div className="flex rounded-lg border border-gray-200">
        <Sidebar />
        <div className="flex-1 p-4 bg-white/80">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Tableau;

import React from "react";
import { NavLink } from "react-router-dom";
import {
  Plus,
  List,
  Clipboard,
  BarChart3,
  MessageSquare,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-[18%]  min-h-screen border-r-2">
      <div className="flex flex-col gap-7 text-lg">
        <NavLink
          to="list"
          className="hover:bg-black hover:text-white transition-colors duration-300 flex items-center gap-3 p-3 border border-r-0 border-gray-300 rounded-lg"
        >
          <p className="hidden md:block">List Produit</p>
          <List
            size={18}
            className="border border-gray-400 rounded-full p-1 w-6 h-6"
          />
        </NavLink>

        <NavLink
          to="add"
          className="hover:bg-black hover:text-white transition-colors duration-300 flex items-center gap-3 p-3 border border-r-0 border-gray-300 rounded-lg"
        >
          <p className="hidden md:block">Ajouter Produit</p>
          <Plus
            size={18}
            className="border border-gray-400 rounded-full p-1 w-6 h-6"
          />
        </NavLink>

        <NavLink
          to="order"
          className="hover:bg-black hover:text-white transition-colors duration-300 flex items-center gap-3 p-3 border border-r-0 border-gray-300 rounded-lg"
        >
          <p className="hidden md:block">Mes commandes</p>
          <Clipboard
            size={18}
            className="border border-gray-400 rounded-full p-1 w-6 h-6"
          />
        </NavLink>

        <NavLink
          to="stats"
          className="hover:bg-black hover:text-white transition-colors duration-300 flex items-center gap-3 p-3 border border-r-0 border-gray-300 rounded-lg"
        >
          <p className="hidden md:block">Statistiques</p>
          <BarChart3
            size={18}
            className="border border-gray-400 rounded-full p-1 w-6 h-6"
          />
        </NavLink>

        <NavLink
          to="settings"
          className="hover:bg-black hover:text-white transition-colors duration-300 flex items-center gap-3 p-3 border border-r-0 border-gray-300 rounded-lg"
        >
          <p className="hidden md:block">Paramètres</p>
          <Settings
            size={18}
            className="border border-gray-400 rounded-full p-1 w-6 h-6"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

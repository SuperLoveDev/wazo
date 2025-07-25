import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setShowInput } = useContext(ShopContext);

  const navMenu = [
    { name: "Home", path: "/" },
    { name: "Client", path: "/client" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "Vendeur", path: "/creerboutique" },
    { name: "A propos", path: "/apropos" },
  ];

  const [visible, setVisible] = useState(false);

  return (
    <div className="flex justify-between items-center  py-5 font-medium">
      <NavLink to="/" className="text-5xl text-black-500">
        WAZ0.
      </NavLink>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-800">
        {navMenu.map((link, index) => {
          return (
            <NavLink
              key={index}
              to={link.path}
              className="flex flex-col items-center gap-1"
            >
              <p>{link.name}</p>
              <hr className="w-2/4 border-none h-[2px] bg-gray-900 hidden" />
            </NavLink>
          );
        })}
      </ul>

      <div className="flex items-center gap-5">
        <img
          onClick={() => setShowInput(true)}
          className="w-5 cursor-pointer"
          src={assets.search_icon}
          alt=""
        />

        <div className="group relative">
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt=""
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 pb-3 ">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p
                onClick={() => navigate("/loginboutique")}
                className="cursor-pointer hover:text-gray-900"
              >
                Profile
              </p>
              <p className="cursor-pointer hover:text-gray-900">
                Mes commandes
              </p>
              {/* <p className="cursor-pointer hover:text-gray-900">Logout</p> */}
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img
            className="w-5 min-w-5 cursor-pointer"
            src={assets.cart_icon}
            alt=""
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full aspect-square text-[8px]">
            10
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt=""
        />
      </div>

      {/* SIDEBAR FOR SMALLER SCREEN */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-amber-50 transition-all ${
          visible ? "w-1/4" : "w-0"
        } `}
      >
        <div className="flex flex-col text-gray-900">
          <div className="flex items-center gap-4 p-3">
            <img
              onClick={() => setVisible(false)}
              className="h-4 rotate-180 cursor-pointer"
              src={assets.dropdown_icon}
              alt=""
            />
            <p
              onClick={() => setVisible(false)}
              className="cursor-pointer font-bold text-xl"
            >
              Back
            </p>
          </div>
          {navMenu.map((link, index) => {
            return (
              <NavLink
                onClick={() => setVisible(false)}
                key={index}
                to={link.path}
                className="py-5 pl-6 cursor-pointer border-t hover:bg-amber-950 hover:text-white text-black"
              >
                <p>{link.name}</p>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

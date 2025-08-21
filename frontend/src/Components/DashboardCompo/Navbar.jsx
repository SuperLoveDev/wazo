import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-6 px-4">
      <div className="max-w-[10%]">
        <h1 className="text-3xl text-black sm:text-4xl">ADMIN.</h1>
      </div>

      <Link
        to="/boutique"
        className="border border-gray-200 bg-transparent text-black hover:bg-black hover:text-white p-3 rounded-full cursor-pointer w-30"
      >
        <p className="text-center text-sm">Sortir</p>
      </Link>
    </div>
  );
};

export default Navbar;

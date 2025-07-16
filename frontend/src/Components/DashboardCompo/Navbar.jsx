import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-6 px-4">
      <div className="max-w-[10%]">
        <h1 className="text-3xl text-black sm:text-4xl">ADMIN.</h1>
      </div>

      <div className="border bg-black text-white p-3 rounded-full cursor-pointer">
        <p className="text-center text-sm">Se deconnecter</p>
      </div>
    </div>
  );
};

export default Navbar;

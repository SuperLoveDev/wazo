import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";

const InputBar = () => {
  const { showInput, setShowInput, inputValue, setInputValue } =
    useContext(ShopContext);

  if (!showInput) return null;

  return (
    <div className="-mt-16 flex items-center border-t  py-4 justify-center gap-10 mx-auto">
      <div className="flex justify-between py-5 px-4 rounded-full border-2 w-full">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border-none w-full outline-0 text-xl"
          type="text"
          placeholder="Boutique"
          autoFocus
        />{" "}
        <img src={assets.search_icon} className="h-5" alt="search-icon" />
      </div>

      <img
        value={inputValue}
        onClick={() => {
          setInputValue("");
          setShowInput(false);
        }}
        src={assets.cross_icon}
        className="h-5 items-center cursor-pointer"
        alt=""
      />
    </div>
  );
};

export default InputBar;

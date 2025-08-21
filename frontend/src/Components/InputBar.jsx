import React, { useContext } from "react";
import { X, SearchIcon } from "lucide-react";
import { ShopContext } from "../Context/ShopContext";

const InputBar = () => {
  const { showInput, setShowInput, inputValue, setInputValue } =
    useContext(ShopContext);

  if (!showInput) return null;

  return (
    <div className="-mt-16 flex items-center border-t py-4 justify-center gap-5 mx-auto">
      <div className="flex justify-between md:w-1/2 py-3 px-4 rounded-full border border-gray-300 w-1/2 h-[50px] min-w-[300px]">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border-none w-full font-sans outline-0 bg-transparent "
          type="text"
          placeholder="Rechercher une boutique ou un article..."
          autoFocus
        />{" "}
        <SearchIcon className="h-5 ml-2" alt="search-icon" />
      </div>

      <X
        value={inputValue}
        onClick={() => {
          setInputValue("");
          setShowInput(false);
        }}
        className="h-5 items-center cursor-pointer"
        alt="crossIcon-image"
      />
    </div>
  );
};

export default InputBar;

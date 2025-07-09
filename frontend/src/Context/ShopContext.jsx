import { createContext } from "react";
import { shops } from "../assets/assets";
import { useState } from "react";

export const ShopContext = createContext(shops);

const ShopContextProvider = ({ children }) => {
  // VARIABLES TO HANDLE INPUT COMPONENT
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const value = { shops, showInput, setShowInput, inputValue, setInputValue };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;

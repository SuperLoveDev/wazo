import { createContext, useMemo } from "react";
import { useState } from "react";
import { boutiques } from "../assets/boutiques";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  // VARIABLES TO HANDLE INPUT COMPONENT
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // SEARCHING A PRODUCT OR BOUTIQUE

  const value = useMemo(
    () => ({
      boutiques,
      showInput,
      setShowInput,
      inputValue,
      setInputValue,
    }),
    [showInput, inputValue]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;

import { createContext, useMemo } from "react";
import { useState } from "react";
import { boutiques } from "../assets/boutiques";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  // VARIABLES TO HANDLE INPUT COMPONENT
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // CONNECTING BACKEND WITH FRONTEND
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = useMemo(
    () => ({
      boutiques,
      showInput,
      setShowInput,
      inputValue,
      setInputValue,
      backendUrl,
    }),
    [showInput, inputValue, backendUrl]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;

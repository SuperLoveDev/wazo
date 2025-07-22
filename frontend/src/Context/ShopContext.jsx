import { createContext, useEffect, useMemo } from "react";
import { useState } from "react";

import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  // VARIABLES TO HANDLE INPUT COMPONENT
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // CONNECTING BACKEND WITH FRONTEND
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //  NEW DYNAMIC BOUTIQUES STATE
  const [boutiques, setBoutiques] = useState([]);

  useEffect(() => {
    const fetcheBoutiques = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/creerboutique/boutique`
        );
        if (response.data.success) {
          setBoutiques(response.data.boutiques);
        } else {
          console.log("Erreur lor du chargement");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des boutiques", error);
      }
    };
    fetcheBoutiques();
  }, [backendUrl]);

  const value = useMemo(
    () => ({
      boutiques,
      showInput,
      setShowInput,
      inputValue,
      setInputValue,
      backendUrl,
    }),
    [showInput, inputValue, backendUrl, boutiques]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;

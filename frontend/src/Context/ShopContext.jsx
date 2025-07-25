import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [boutiques, setBoutiques] = useState([]);
  const [selectedBoutique, setSelectedBoutique] = useState(null);

  //TO SHOW BOUTIQUE DYNAMICALLY
  useEffect(() => {
    const fetchBoutiques = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/creerboutique/boutique`
        );
        if (response.data.success) {
          setBoutiques(response.data.boutiques);

          if (response.data.boutiques.length > 0) {
            setSelectedBoutique(response.data.boutiques[0]._id);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des boutiques", error);
      }
    };
    fetchBoutiques();
  }, [backendUrl]);

  // TO SEE PRODUCT ADDED FROM THE BOUTIQUEOWNER DASHBOARD
  const updateBoutiqueProducts = (boutiqueId, newProduct) => {
    setBoutiques((prevBoutiques) =>
      prevBoutiques.map((boutique) =>
        boutique._id === boutiqueId
          ? {
              ...boutique,
              products: [newProduct, ...(boutique.products || [])],
            }
          : boutique
      )
    );
  };

  const value = useMemo(
    () => ({
      boutiques,
      selectedBoutique,
      setSelectedBoutique,
      showInput,
      setShowInput,
      inputValue,
      setInputValue,
      backendUrl,
      updateBoutiqueProducts,
      setBoutiques,
    }),
    [showInput, inputValue, backendUrl, boutiques, selectedBoutique]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;

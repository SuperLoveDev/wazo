import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [boutiques, setBoutiques] = useState([]);
  const [selectedBoutique, setSelectedBoutique] = useState(null);

  const loginBoutique = (token, boutique) => {
    localStorage.setItem("boutiqueToken", token);
    localStorage.setItem("selectedBoutiqueId", boutique._id);
    setSelectedBoutique(boutique);
  };

  useEffect(() => {
    const fetchBoutiques = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/creerboutique/boutique`
        );
        if (response.data.success) {
          setBoutiques(response.data.boutiques);

          const storedBoutiqueId = localStorage.getItem("selectedBoutiqueId");

          let boutiqueObj = response.data.boutiques.find(
            (b) => b._id === storedBoutiqueId
          );

          if (boutiqueObj) {
            setSelectedBoutique(boutiqueObj);
          } else if (response.data.boutiques.length > 0) {
            boutiqueObj = response.data.boutiques[0];
            setSelectedBoutique(boutiqueObj);
            localStorage.setItem("selectedBoutiqueId", boutiqueObj._id);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des boutiques", error);
      }
    };
    fetchBoutiques();
  }, [backendUrl]);

  // Quand l'utilisateur change de boutique
  const handleBoutiqueChange = (newBoutiqueId) => {
    const boutiqueObj = boutiques.find((b) => b._id === newBoutiqueId);
    if (boutiqueObj) {
      setSelectedBoutique(boutiqueObj);
      localStorage.setItem("selectedBoutiqueId", newBoutiqueId);
    }
  };

  // Mise à jour des produits dans la boutique sélectionnée
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

    // Si la boutique mise à jour est la sélectionnée, on la met à jour aussi
    if (selectedBoutique?._id === boutiqueId) {
      setSelectedBoutique((prev) => ({
        ...prev,
        products: [newProduct, ...(prev.products || [])],
      }));
    }
  };

  const value = useMemo(
    () => ({
      boutiques,
      selectedBoutique,
      setSelectedBoutique: handleBoutiqueChange,
      loginBoutique,
      showInput,
      setShowInput,
      inputValue,
      setInputValue,
      backendUrl,
      updateBoutiqueProducts,
      setBoutiques,
    }),
    [boutiques, selectedBoutique, showInput, inputValue, backendUrl]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;

import React, { useContext, useMemo, useState } from "react";
import { assets } from "../assets/assets";
import Card from "./Card";
import { ShopContext } from "../Context/ShopContext";
import InputBar from "./InputBar";

const BoutiqueCard = ({ boutiqueId }) => {
  // IMPORTING BOUTIQUE DATA FROM CONTEXT
  const { boutiques, inputValue } = useContext(ShopContext);

  const filterList = [
    "TOUS",
    "FASION",
    "BEAUTÉ",
    "COUTURE",
    "PAGNES",
    "AUDIO-VISUEL",
    "RESTAURANT",
    "SERVICE",
    "EDUCATION",
    "LOCATION",
    "FITNESS",
  ];

  // VARIABLES FOR FILTERS LIST ON MOBILE PHONE
  const [showFilter, setShowFilter] = useState(false);

  // VARIABLES FOR FILTERING BOUTIQUE CATEGORIES & FUNCTION
  const [selectedfiltered, setSelectedFiltered] = useState("TOUS");
  const filteredBoutique = useMemo(() => {
    return selectedfiltered === "TOUS"
      ? boutiques
      : boutiques.filter((b) => b.category === selectedfiltered);
  }, [boutiques, selectedfiltered]);

  // DYNAMIC SEARCHING FOR A BOUTIQUE OR PRODUCTS
  const searchingBoutique = useMemo(() => {
    if (!inputValue) return null;

    return boutiques.filter((boutique) => {
      const nameMatch = boutique.name
        .toLowerCase()
        .includes(inputValue.toLowerCase());
      const descMatch = boutique.description
        .toLowerCase()
        .includes(inputValue.toLowerCase());
      const adresseMatch = boutique.adresse
        .toLowerCase()
        .includes(inputValue.toLowerCase());

      return nameMatch || descMatch || adresseMatch;
    });
  }, [boutiques, inputValue]);

  const boutiqueDisplay = useMemo(() => {
    if (boutiqueId)
      return (
        boutiqueId ===
        boutiques.filter((boutique) => boutique.id === boutiqueId)
      );
    if (inputValue) return searchingBoutique;
    return filteredBoutique;
  }, [boutiqueId, boutiques, inputValue, searchingBoutique, filteredBoutique]);

  return (
    <>
      <InputBar />
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10">
        <div className="min-w-55">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-3 text-2xl font-bold font-sans md:text-base cursor-pointer"
          >
            FILTRES{" "}
            <img
              src={assets.dropdown_icon}
              className={`h-4 sm:hidden cursor-pointer ${
                showFilter ? "rotate-90" : ""
              }`}
              alt="dropw-icon"
            />
          </p>
          <div
            className={`my-3 border border-gray-400 pl-5 py-3 ${
              showFilter ? "" : "hidden sm:block"
            }`}
          >
            <p className="font-sans font-medium">CATEGORIE</p>
            <div className="flex flex-col gap-3 text-black my-4">
              {/* MAPPING MY CATEGORY FILTER LIST */}

              {filterList.map((list, index) => {
                return (
                  <p
                    onClick={() => setSelectedFiltered(list)}
                    key={index}
                    className="flex gap-4 font-sans "
                  >
                    <input
                      name="categoryFilter"
                      onChange={() => setSelectedFiltered(list)}
                      type="checkbox"
                      value={list}
                    />
                    {list}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOUTIQUE-CARD */}
        {boutiqueDisplay && boutiqueDisplay.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 rounded-2xl">
            {/* RENDERING BOUTIQUE AND SELECTED CATEGORY */}
            {boutiqueDisplay.map((boutique) => (
              <div key={boutique.id} className="h-full">
                <Card
                  id={boutique.id}
                  image={boutique.image}
                  name={boutique.name}
                  rating={boutique.rating.stars}
                  article={boutique.article}
                  adresse={boutique.adresse}
                  whatsapp={boutique.whatsapp}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center w-full py-8 text-gray-500 font-medium text-lg">
            😕 Aucun résultat trouvé.
          </div>
        )}
      </div>
    </>
  );
};

export default BoutiqueCard;

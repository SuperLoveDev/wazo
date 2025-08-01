import React, { useContext, useMemo, useState } from "react";
import { assets } from "../assets/assets";
import Card from "./Card";
import { ShopContext } from "../Context/ShopContext";
import InputBar from "./InputBar";

const BoutiqueCard = ({ boutiqueId }) => {
  const { boutiques, inputValue } = useContext(ShopContext);

  const filterList = [
    "TOUS",
    "FASION",
    "BEAUTÉ",
    "COUTURE",
    "COSMETIQUE",
    "PAGNES",
    "AUDIO-VISUEL",
    "RESTAURANT",
    "SERVICE",
    "EDUCATION",
    "LOCATION",
    "FITNESS",
    "PARFUMERIE",
  ];

  const [showFilter, setShowFilter] = useState(false);
  const [selectedFiltered, setSelectedFiltered] = useState("TOUS");

  const filteredBoutique = useMemo(() => {
    return selectedFiltered === "TOUS"
      ? boutiques
      : boutiques.filter((b) => b.category === selectedFiltered);
  }, [boutiques, selectedFiltered]);

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
    if (boutiqueId) {
      const found = boutiques.find((boutique) => boutique._id === boutiqueId);
      return found ? [found] : [];
    }
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
              alt="dropdown-icon"
            />
          </p>
          <div
            className={`my-3 border border-gray-400 pl-5 py-3 ${
              showFilter ? "" : "hidden sm:block"
            }`}
          >
            <p className="font-sans font-medium">CATEGORIE</p>
            <div className="flex flex-col gap-3 text-black my-4">
              {filterList.map((list, index) => (
                <p
                  onClick={() => setSelectedFiltered(list)}
                  key={index}
                  className="flex gap-4 font-sans cursor-pointer"
                >
                  <input
                    name="categoryFilter"
                    onChange={() => setSelectedFiltered(list)}
                    type="radio"
                    checked={selectedFiltered === list}
                  />
                  {list}
                </p>
              ))}
            </div>
          </div>
        </div>

        {boutiqueDisplay && boutiqueDisplay.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 rounded-2xl">
            {boutiqueDisplay.map((boutique) => (
              <div key={boutique._id} className="h-full">
                <Card
                  id={boutique._id}
                  image={boutique.image}
                  name={boutique.name}
                  description={boutique.description}
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

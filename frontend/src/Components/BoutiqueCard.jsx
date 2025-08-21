import React, { useContext, useMemo, useState } from "react";
import Card from "./Card";
import { ShopContext } from "../Context/ShopContext";
import InputBar from "./InputBar";

const BoutiqueCard = ({ boutiqueId }) => {
  const { boutiques, inputValue } = useContext(ShopContext);

  const filterList = [
    "TOUS",
    "MODE",
    "COUTURE",
    "COSMETIQUE",
    "PAGNES",
    "PRET A PORTER",
    "RESTAURANT",
    "SERVICE",
    "EDUCATION",
    "BOIJOUTERIE",
    "PAGNE",
    "PARFUMERIE",
  ];

  const [selectedFiltered, setSelectedFiltered] = useState("TOUS");

  const filteredBoutique = useMemo(() => {
    return selectedFiltered === "TOUS"
      ? boutiques
      : boutiques.filter(
          (b) => b.category.toLowerCase() === selectedFiltered.toLowerCase()
        );
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
      <div className="flex flex-col gap-10 sm:gap-10 min-h-[100vh] sm:min-h-[100vh]">
        <div className="px-2 overflow-x-auto w-screen -mx-[calc(50vw-50%)]">
          <div className="flex gap-2 py-2">
            {filterList.map((list, index) => (
              <button
                key={index}
                onClick={() => setSelectedFiltered(list)}
                className={`whitespace-nowrap px-4 py-2 rounded-full border
          ${
            selectedFiltered === list
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-500"
          }`}
              >
                {list}
              </button>
            ))}
          </div>
        </div>

        {boutiqueDisplay && boutiqueDisplay.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols- gap-4 rounded-2xl w-screen -mx-[calc(50vw-50%)] px-5">
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

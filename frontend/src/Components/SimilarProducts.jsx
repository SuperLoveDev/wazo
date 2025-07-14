import React, { useContext, useRef } from "react";
import Title from "./Title";
import { ShopContext } from "../Context/ShopContext";
import Card from "./Card";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SimilarProducts = ({ boutique }) => {
  // IMPORT BOUTIQUE TABLE/DATA FROM CONTEXT API
  const { boutiques } = useContext(ShopContext);
  const scrollRef = useRef(null);

  // DISPLAY SAME CATEGORY BOUTIQUES
  const sameBoutiques = boutiques.filter(
    (b) => b?.id !== boutique.id && b?.category === boutique?.category
  );

  if (sameBoutiques.length === 0) return null;

  return (
    <>
      <div className="flex justify-between items-center">
        <Title text1={"Boutiques"} text2={"similaires"} />
        <div className="hidden sm:flex gap-3">
          <ArrowLeft
            onClick={() => {
              scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
            }}
            size={20}
            className="border border-gray-300 bg-white rounded-full p-2 w-10 h-10 cursor-pointer"
          />
          <ArrowRight
            onClick={() => {
              scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
            }}
            size={20}
            className="border border-gray-300 bg-white rounded-full p-2 w-10 h-10 cursor-pointer"
          />
        </div>
      </div>

      <div ref={scrollRef} className="py-15 overflow-x-auto">
        {sameBoutiques.map((boutique) => (
          <Card
            key={boutique.id}
            image={boutique.image}
            name={boutique.name}
            article={boutique.article}
            rating={boutique.rating?.stars}
            adresse={boutique.adresse}
            whatsapp={boutique.whatsapp}
            onClick={() => (window.location.href = `/catalogue/${boutique.id}`)}
          />
        ))}
      </div>
    </>
  );
};

export default SimilarProducts;

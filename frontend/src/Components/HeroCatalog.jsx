import React, { useContext } from "react";
import InputBar from "./InputBar";
import { ShopContext } from "../Context/ShopContext";

const HeroCatalog = () => {
  const { setShowInput } = useContext(ShopContext);
  return (
    // HERO FOR CATALOG PAGE

    <div className="text-center py-20">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-5xl font-bold">
          Découvrez les <br />
          <span className="text-6xl bg-gradient-to-l from-purple-600 to-red-500 bg-clip-text text-transparent transition-all duration-500">
            meilleures
          </span>{" "}
          boutiques près de chez vous
        </h1>
        <p className="text-base text-center items-center lg:text-base sm:text-base mx-auto mt-6">
          {" "}
          Beauté, soins, mode, alimentation, Restauration AudioVisuel et Bien
          d'autres… Wazo vous connecte aux entrepreneurs de votre quartier, pour
          consommer local et simplifier votre quotidien.
        </p>

        <div
          onClick={() => setShowInput(true)}
          className="border my-10 w-60 h-[69px] flex items-center justify-center rounded-full bg-black cursor-pointer hover:bg-black/70"
        >
          <button
            className="text-white font-bold text-center
        lg:text-xl md:text-text-base cursor-pointer"
          >
            Recherche Boutique
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCatalog;

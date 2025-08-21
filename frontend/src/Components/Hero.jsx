import React from "react";
import { assets } from "../assets/assets";
import SectorCard from "./SectorCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Ticker from "../Components/Ticker";

const Hero = () => {
  const images = [
    { name: "image1", src: assets.person_1 },
    { name: "image2", src: assets.person_2 },
    { name: "image3", src: assets.person_3 },
  ];

  return (
    <>
      <div className="">
        <div className="flex flex-col items-center text-center tracking-tight my-10 font-sans mt-20">
          <h1 className="font-bold text-4xl sm:text-7xl text-black mb-6">
            Le logiciel n°1 pour votre commerce, service et toute activité
          </h1>

          <p className="my-2 font-light text-gray-600 sm:text-sm md:text-base">
            Wazo est votre solution tout-en-un pour créer une boutique
            e-commerce et vendre tout type de produit ou service à n'importe
            qui, partout dans le monde.
          </p>

          {/* HERO BUTTON */}
          <Link to="/creerboutique">
            <button className="border my-2 font-bold cursor-pointer w-35 h-[50px] bg-black text-white hover:bg-black/80 hover:text-white border-none rounded-full">
              Lancez-vous
            </button>
          </Link>

          {/* HERO IMAGE */}
          <div className="w-screen h-80 sm:h-80 md:h-screen my-5">
            <img
              src={assets.heroImage}
              alt="hero-image"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="">
          <Ticker />
        </div>

        {/* MAPPING IMAGES AND OVERLAPPING THEM  */}
        <div className="relative w-screen -mx-[calc(50vw-50%)] bg-gradient-to-t from-black to-black my-25 flex flex-col sm:flex-col items-center justify-center pb-10">
          <div className="flex items-center gap-1 mb-5 my-5">
            {images.map((image, index) => {
              return (
                <img
                  key={index}
                  className={`rounded-full h-22 w-22 object-cover border-2 border-white mb-5 mt-10 ${
                    index !== 0 ? "-ml-3" : ""
                  }`}
                  src={image.src}
                  alt={image.name}
                />
              );
            })}
          </div>
          <h1 className="text-center text-xl text-white mb-10">
            Plus de 754 000 utilisateurs nous font déjà confiance dans le monde
            entier. <br />
            <span>
              Commence ton aventure dès maintenant et gagne de l'argent avec
              Wazo.
            </span>
          </h1>

          <div className="flex flex-col items-center justify-center my-5">
            <h1 className="font-bold text-center text-white text-3xl sm:text-5xl mb-6">
              Une plateforme unique, des possibilités illimitées
            </h1>

            <p className="my-2 text-center max-w-3xl text-white sm:text-sm md:text-base">
              Wazo vous propose tout ce dont vous avez besoin pour développer
              vos activités et prospérer, notamment des outils pour booster
              votre chiffre d'affaires, gérer votre calendrier et fidéliser vos
              clients. Vous pouvez ainsi vous concentrer pleinement sur ce que
              vous aimez et faites le mieux.
            </p>
          </div>

          <div className="text-black font-semibold flex items-center justify-center gap-2 border w-40 h-[60px] rounded-full bg-white cursor-pointer hover:bg-white/90">
            Lancez-Vous
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
      <SectorCard />
    </>
  );
};

export default Hero;

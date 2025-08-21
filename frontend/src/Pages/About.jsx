import React from "react";
import { ShoppingBag, LockIcon, Monitor } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Ticker from "../Components/Ticker";
import CatalogFooter from "../Components/CatalogFooter";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="py-12 px-4">
      <h1 className="text-3xl sm:text-5xl text-center font-bold mb-6">
        Un logiciel tout-en-un pour donnez vie a votre commerce, boutique
        gratuitement.{" "}
      </h1>

      <div className="flex flex-col items-center text-base sm:text-xl py-5">
        <p className="text-center">
          Tracez l’avenir de votre boutique. Inscrivez-vous gratuitement,aucune
          carte de crédit requise.
        </p>
        <div className="py-7">
          <button
            onClick={() => navigate("/creerboutique")}
            className="border rounded-full w-70 h-[69px] bg-black hover:bg-black/80 text-white cursor-pointer"
          >
            Lancez votre boutique
          </button>
        </div>
      </div>

      <p className="mb-4 italic text-center py-3 sm:py-12  text-gray-700">
        <strong>Wazo</strong> est une plateforme innovante qui permet à tout le
        monde de créer sa boutique en ligne en quelques minutes. Que vous soyez
        vendeur indépendant, artisan ou commerçant, vous pouvez proposer vos
        produits et les vendre facilement.
      </p>

      <Ticker />

      <h2 className="text-5xl text-center font-semibold mt-12 mb-8">
        Pourquoi Wazo ?
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-3 gap-10 my-12">
        <div className="flex flex-col items-center gap-3">
          <ShoppingBag size={50} className="bg-purple-500 p-2 rounded-lg" />
          <p className="text-xl text-black/70">
            Wazo s’occupe de tout, du marketing au paiement, en passant par les
            transactions sécurisées et l’expédition.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <LockIcon size={50} className="bg-purple-500 p-2 rounded-lg" />
          <p className="text-xl text-black/70">
            Des milliers d’utilisateurs font confiance à Wazo pour gérer leurs
            boutiques en ligne.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Monitor size={50} className="bg-purple-500 p-2 rounded-lg" />
          <p className="text-xl text-black/70">
            Des conceptions de site web gratuites pour lancer votre boutique
            rapidement et facilement.
          </p>
        </div>
      </div>

      <div className="w-ful">
        <div className="text-3xl py-10 text-white text-center">
          ☆Wazo est de loin la meilleure plateforme e-boutique du marché☆
        </div>
        <p className="text-gray-700 text-xl text-center pb-10">
          Adenihi a.k.m , PDG de Wazo
        </p>
      </div>

      <CatalogFooter />
    </div>
  );
};

export default About;

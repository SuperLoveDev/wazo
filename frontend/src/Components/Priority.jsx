import React from "react";
import { assets } from "../assets/assets";
const Priority = () => {
  return (
    <div className="bg-black w-screen -mx-[calc(50vw-50%)] overflow-hidden ">
      <div className="max-w-7xl mx-auto py-16 px-6 mb-16">
        <h1 className="text-5xl md:text-4xl font-bold text-white">
          Votre Élévation est notre mission première.
        </h1>
        <p className="text-white text-base font-sans mt-5">
          Chaque Boutique est unique, avec des besoins unique. WAZO vous propose
          des services professionnels pour y repondre et vous rendre{" "}
          <span className="text-purple-400 text-3xl font-bold">UNIQUE.</span>
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-5 gap-p-6 items-center pb-20">
        <div className="flex flex-col items-center">
          <img
            src={assets.exchange_icon}
            className="bg-white rounded-full"
            alt=""
          />
          <p className="text-white mt-5">
            Obtenez un soutien dédié pour atteindre votre plein potentiel sur
            Wazo.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={assets.quality_icon}
            className="bg-white rounded-full"
            alt=""
          />
          <p className="text-white mt-5">
            Vous avez une question ? Contactez-nous. Nous trouverons une
            solution ensemble.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={assets.support_img}
            className="bg-white rounded-full"
            alt=""
          />
          <p className="text-white mt-5">
            Vous n'êtes jamais seul. Bénéficiez d'une assistance client primée
            24 h/24 et 7 j/7.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-6 mb-19">
        <h1 className="text-white sm:text-xl md:text-base lg:text-6xl text-4xl">
          QU'Attendez-Vous ?
        </h1>
        <p className="text-white text-xl px-4">
          Crée et développe ton activité des aujourdhui.
        </p>
        <button className="text-black text-center border w-50 h-[60px] text-xl rounded-full cursor-pointer bg-white hover:bg-white/80">
          Lancez-Vous
        </button>
      </div>
    </div>
  );
};

export default Priority;

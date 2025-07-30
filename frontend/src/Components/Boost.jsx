import React from "react";
import wazoPayment from "../assets/wazopayment.png";
import { useNavigate } from "react-router-dom";

const Boost = () => {
  const navigate = useNavigate();

  return (
    <div className="my-25 w-full text-2xl">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="font-sans text-4xl font-bold mb-5">
            Avec{" "}
            <span className="bg-gradient-to-r from-purple-600 via-red-400 to-red-400 bg-clip-text text-transparent">
              Wazo
            </span>{" "}
            ta boutique devient visible en ligne et attire plus de clients dans
            ton quartier, <br />
            tout en bénéficiant du{" "}
            <span className="bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent font-bold">
              paiement sécurisé et facile
            </span>
          </h1>

          <p className="text-base font-sans">
            {" "}
            Créez votre boutique en ligne pour montrer vos produits aux clients
            . Recevez des commandes directement et augmentez vos ventes sans
            effort.
          </p>
          <p className="text-base font-sans">
            {" "}
            Encaissez vos paiements Mobile Money ou carte de façon sécurisée
            sans perdre de temps. Suivez chaque transaction en temps réel, sans
            papier ni calcul compliqué.
          </p>
          <p className="text-base font-sans">
            Avec Wazo, ta boutique devient visible à tous, même quand tu dors,
            sans avoir besoin d'un gros budget. Digitalise ton activité et
            attire plus de clients sans stress, depuis ton téléphone.
          </p>
          <p className="text-base font-sans">
            {" "}
            Avec Wazo, montre ta boutique au quartier et au-delà, sans te
            compliquer la vie. Inspire confiance aux clients qui te découvrent
            en ligne et te retrouvent facilement.
          </p>
          <p className="text-base font-sans">
            {" "}
            Pas besoin de formation, Wazo est simple comme ton WhatsApp. Tu
            gères tes commandes, tes paiements et tes clients depuis ton
            téléphone.
          </p>
          <p className="text-base font-sans">
            {" "}
            Digitalise ta boutique sans te ruiner grâce à Wazo. Peu importe ta
            taille, tu as droit à une solution pro sans casser ta tirelire.
          </p>
        </div>

        <img
          src={wazoPayment}
          className="min-w-[30%] sm:w-auto h-[500px] object-cover rounded-3xl"
          loading="lazy"
          alt="wazo-payment"
        />
      </div>
      <div
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/creerboutique");
        }}
        className="border cursor-pointer bg-black w-55 h-[60px] flex justify-center items-center my-10 mx-auto text-white rounded-full hover:bg-black/80 transition-transform duration-300"
      >
        <button className="font-sans text-center text-base cursor-pointer">
          Créer-Boutique
        </button>
      </div>
    </div>
  );
};

export default Boost;

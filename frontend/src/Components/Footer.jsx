import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-100 w-screen -mx-[calc(50vw-50%)] overflow-hidden">
      <div className="max-w-7xl mx-auto py-20 px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-black">WAZO.</h1>
          <p className="text-sm  text-wrap text-gray-700">
            Votre boutique en ligne clé en main, sans prise de tête. Wazo
            digitalise votre activité en 1 clic, booste votre visibilité et
            sécurise vos paiements. Parfait pour les entrepreneurs pressés qui
            veulent grandir sans se ruiner. Le commerce intelligent, enfin
            accessible à tous !
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-black">SOCIETE</h1>
          <p className="text-gray-700 text-sm cursor-pointer">Accueil</p>
          <p className="text-gray-700 text-sm cursor-pointer">Pofessionnels</p>
          <p className="text-gray-700 text-sm cursor-pointer">Catalogue</p>
          <p className="text-gray-700 text-sm cursor-pointer">Créer Boutique</p>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-black">RETROUVEZ-NOUS</h1>
          <p className="text-gray-700 text-sm">Contact: +225 07 07 07 07 07</p>
          <ul className="flex flex-col gap-4">
            <li className="text-gray-700 text-sm cursor-pointer">Facebook</li>
            <li className="text-gray-700 text-sm cursor-pointer">Instagram</li>
            <li className="text-gray-700 text-sm cursor-pointer">Twitter</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <hr className="w-3/4 mx-auto h-0.5 border rounded-full bg-black" />
        <div className="flex justify-between py-10 text-bold">
          <p className="cursor-pointer">français</p>
          <p>© {new Date().getFullYear()} Wazo.com CI Mtd</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

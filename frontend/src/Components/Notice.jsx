import React from "react";

const Notice = () => {
  return (
    <div className="bg-purple-100 w-screen -mx-[calc(50vw-50%)]">
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-20">
        <h1 className="text-3xl sm:text-xl md:text-base lg:text-4xl font-bold">
          Tout ce dont vous avez besoin pour gérer vos activités
        </h1>
        <p className="mt-5 font-light text-md">
          Wazo propose des fonctionnalités innovantes qui offrent commodité et
          efficacité, ainsi <br /> qu'une expérience améliorée aux membres de
          votre équipe et à vos clients.
        </p>
      </div>

      <div className="px-4 mt-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8">Développer</h1>
          <p>
            Attirez plus de clients et boostez votre visibilité grâce à une
            boutique en ligne professionnelle, optimisée pour le référencement
            et adaptée aux mobiles. Proposez vos produits et services 24h/24,
            automatisez vos prises de rendez-vous, et touchez de nouveaux
            marchés, sans limites géographiques.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8">Encaisser</h1>
          <p>
            Acceptez les paiements en toute simplicité grâce aux intégrations
            Mobile Money, cartes bancaires et paiements en espèces, le tout sur
            une seule plateforme sécurisée. Profitez de paiements rapides, de
            reçus automatiques, et d’un suivi complet de vos transactions pour
            mieux gérer votre trésorerie au quotidien.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8">Gérer</h1>
          <p>
            Gagnez du temps et de la sérénité en pilotant vos stocks, vos
            ventes, vos rendez-vous et votre clientèle à partir d'un tableau de
            bord intuitif. Recevez des rapports détaillés sur vos performances,
            automatisez vos notifications clients et restez concentré sur le
            développement de votre activité pendant que Wazo s’occupe du reste.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notice;

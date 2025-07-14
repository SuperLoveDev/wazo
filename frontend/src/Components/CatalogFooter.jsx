import React from "react";

const CatalogFooter = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-center sm:text-5xl">
          La destination n° 1 pour entreprendre,vendre et satisfaire vos
          besoins.
        </h1>
        <p className="text-sm">
          Un Logiciel , une solution. Les meilleurs Wazo nous font deja
          confiance
        </p>
        <div className="flex flex-col text-center pt-4 gap-4">
          <p className="text-6xl bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent font-bold">
            + de 901.000{" "}
          </p>
          <p className="text-base text-black">Boutique utilisent Wazo</p>
        </div>
      </div>

      <div className="pt-15 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex flex-col text-center">
          <h1 className="text-6xl bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent font-bold">
            +30
          </h1>
          <p>Pays utilisent wazo</p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-6xl bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent font-bold">
            +20
          </h1>
          <p>Collaborateur partout dans le monde</p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-6xl bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent font-bold">
            +845.000{" "}
          </h1>
          <p>professionnels font confaince a Wazo</p>
        </div>
      </div>
    </div>
  );
};

export default CatalogFooter;

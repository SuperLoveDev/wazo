import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Title from "../Components/Title";
import Gallery from "./Gallery";
import SimilarProducts from "./SimilarProducts";
import NearbyBoutiques from "./NearbyBoutique";
import CatalogFooter from "./CatalogFooter";

const CatalogDetails = () => {
  const { id } = useParams();
  const { boutiques } = useContext(ShopContext);
  const boutique = boutiques.find((b) => b._id === id);

  if (!boutique) {
    return (
      <div className="text-center py-10 text-gray-500">
        Boutique introuvable ❌ .
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      {/* Conteneur principal pour la galerie */}
      <div className="w-full mb-8">
        <Title text1={"GALLERY"} />
        <div className="pt-10">
          <Gallery boutique={boutique} />
        </div>
      </div>

      <div className="py-20">
        <SimilarProducts boutique={boutique} />
        <NearbyBoutiques boutique={boutique} />
        <CatalogFooter />
      </div>
    </div>
  );
};

export default CatalogDetails;

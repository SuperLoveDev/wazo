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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {boutique.products?.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.article}
                  className="w-full aspect-square object-cover"
                />
              ) : product.video ? (
                <video
                  src={product.video}
                  className="w-full aspect-square object-cover"
                  controls
                />
              ) : (
                <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Pas de média</span>
                </div>
              )}
              <div className="p-2">
                <h3 className="font-medium text-sm truncate">
                  {product.article}
                </h3>
                <p className="text-xs text-gray-500">{product.price} FCFA</p>
              </div>
            </div>
          ))}
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

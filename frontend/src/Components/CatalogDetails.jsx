import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MessageCircle } from "lucide-react";
import Title from "../Components/Title";
import Gallery from "./Gallery";
import SimilarProducts from "./SimilarProducts";
import NearbyBoutiques from "./NearbyBoutique";

const CatalogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { boutiques } = useContext(ShopContext);

  const boutique = boutiques.find((b) => b.id === id);

  const [clickMedia, setClickMedia] = useState({
    type: "image",
    src: boutique?.image || "",
  });

  if (!boutique) {
    return (
      <div className="text-center py-10 text-gray-500">
        😕 Boutique introuvable.
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* IMAGE / VIDEO PRINCIPALE */}
        <div className="flex flex-col gap-4 rounded-xl shadow-xl bg-gray-100 p-4 lg:w-2/3">
          {clickMedia.type === "image" && (
            <img
              src={clickMedia.src || boutique.image}
              className="w-full max-h-[500px] object-contain rounded-2xl mb-2"
              alt={boutique.name}
            />
          )}
          {clickMedia.type === "video" && (
            <video
              src={clickMedia.src}
              controls
              className="w-full max-h-[500px] object-contain rounded-2xl mb-2"
            />
          )}

          <div className="flex flex-col gap-2">
            <h1 className="text-xl text-black flex items-center justify-between">
              {boutique.name}
              <div className="flex items-center">
                <Star size={20} className="text-black-500 fill-black-500" />
                <span>{boutique.rating.stars} / 5</span>
              </div>
            </h1>
            <p className="text-sm text-gray-600 text-bold line-clamp-2 border border-gray-300 bg-white rounded-2xl p-2">
              Desc: {boutique.description}
            </p>
            <p className="text-md">📍 Adresse: {boutique.adresse}</p>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="border border-gray-200 rounded-2xl p-2 text-gray-600 text-sm sm:text-base bg-white transition cursor-pointer"
            >
              ← Retour aux boutiques
            </button>
            <button className="border border-gray-200 rounded-2xl p-2 text-gray-600 text-sm sm:text-base bg-white font-bold transition cursor-pointer">
              Ajouter au panier +
            </button>
            <a
              href={`https://wa.me/${boutique.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center p-2 rounded-2xl text-white text-sm sm:text-base bg-green-900 hover:bg-green-700 transition"
            >
              <MessageCircle size={18} className="mr-2" />
              Contacter sur WhatsApp
            </a>
          </div>
        </div>

        {/* GALLERY */}
        {boutique.products && boutique.products.length > 0 && (
          <Gallery
            clickMedia={clickMedia}
            setClickMedia={setClickMedia}
            boutique={boutique}
          />
        )}
      </div>
      <div className="py-20">
        <SimilarProducts boutique={boutique} />
        <NearbyBoutiques boutique={boutique} />
      </div>
    </div>
  );
};

export default CatalogDetails;

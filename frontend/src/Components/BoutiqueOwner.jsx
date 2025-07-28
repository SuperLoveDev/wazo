import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { Star, BarChart2 } from "lucide-react";
import Gallery from "../Components/Gallery";
import Tableau from "../Pages/Dashboard/Tableau";

const BoutiqueOwner = () => {
  const navigate = useNavigate();
  const { boutiques, selectedBoutique } = useContext(ShopContext);
  const [showStat, setShowStat] = useState(false);

  const boutique = boutiques.find((b) => b._id === selectedBoutique);

  const [clickMedia, setClickMedia] = useState(
    boutique?.image ? { type: "image", src: boutique.image } : null
  );

  useEffect(() => {
    if (boutique && boutique.image) {
      setClickMedia({
        type: "image",
        src: boutique.image,
      });
    }
  }, [boutique]);

  if (!boutique) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Chargement de la boutique...
      </div>
    );
  }

  console.log("Boutique data:", boutique);
  console.log("Products:", boutique?.products);

  return (
    <>
      {!showStat ? (
        <div className="max-w-[1400px] mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* IMAGE/VIDEO PRINCIPALE */}
            <div className="flex flex-col gap-4 rounded-xl shadow-xl bg-gray-100 p-4 lg:w-2/3">
              {clickMedia?.type === "image" && (
                <img
                  src={clickMedia.src}
                  className="w-full max-h-[500px] object-contain rounded-2xl mb-2"
                  alt={boutique.name}
                />
              )}
              {clickMedia?.type === "video" && (
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
                    <Star
                      size={20}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  </div>
                </h1>
                <p className="text-sm text-gray-600 font-bold line-clamp-2 border border-gray-300 bg-white rounded-2xl p-2">
                  Desc: {boutique.description}
                </p>
                <p className="text-md">📍 Adresse: {boutique.adresse}</p>
              </div>

              <div className="flex justify-between flex-wrap gap-3 sm:gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="border border-gray-200 rounded-2xl p-2 text-gray-600 text-sm sm:text-base bg-white transition cursor-pointer"
                >
                  ← Retour
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      navigate("/tableau");
                      setShowStat((prev) => !prev);
                    }}
                    className=" rounded-2xl p-2 text-gray-600 text-sm sm:text-base cursor-pointer"
                  >
                    Voir 👉🏽
                  </button>
                  <button className="border flex items-center-safe gap-1 border-gray-200 rounded-2xl p-2 text-white text-sm sm:text-base bg-black font-bold transition cursor-pointer">
                    <BarChart2 /> Statistic
                  </button>
                </div>
              </div>
            </div>

            {/* GALLERY */}
            {boutique.products?.length > 0 && (
              <Gallery
                // clickMedia={clickMedia}
                // setClickMedia={setClickMedia}
                boutique={boutique}
                products={boutique.products}
              />
            )}
          </div>
        </div>
      ) : (
        <Tableau />
      )}
    </>
  );
};

export default BoutiqueOwner;

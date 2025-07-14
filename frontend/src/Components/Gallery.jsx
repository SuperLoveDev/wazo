import React from "react";
import Title from "../Components/Title";
import GalleryCard from "./GalleryCard";

const Gallery = ({ setClickMedia, boutique }) => {
  return (
    <div className="rounded-xl shadow-xl bg-gray-50 p-4 lg:w-1/3">
      <Title text1={"GALLERY"} />
      <div className="grid grid-cols-2 gap-3 mt-2">
        {boutique.products.map((product) => {
          // const productImage = Array.isArray(product.image)
          //   ? product.image[0]
          //   : product.image;

          return (
            <div
              key={product.id}
              className="border border-gray-300 rounded-2xl overflow-hidden cursor-pointer"
            >
              {product.video ? (
                <>
                  <video
                    onClick={() =>
                      setClickMedia({ type: "video", src: product.video })
                    }
                    src={product.video}
                    className="w-full aspect-square object-cover"
                    controls
                  />
                  <div className="p-2 flex flex-col gap-1">
                    <h3 className="font-medium text-xs line-clamp-2">
                      {product.name}
                    </h3>
                  </div>
                </>
              ) : (
                <GalleryCard
                  product={product}
                  boutique={boutique}
                  setClickMedia={setClickMedia}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;

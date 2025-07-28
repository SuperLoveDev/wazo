import React from "react";
import GalleryCard from "./GalleryCard";

const Gallery = ({ boutique }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {boutique.products?.map((product, index) => (
          <GalleryCard
            key={product._id || `${product.name}-${index}`}
            description={product.description}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

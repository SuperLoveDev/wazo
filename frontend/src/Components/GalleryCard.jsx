import React from "react";
import { ShopContext } from "../Context/ShopContext";

const GalleryCard = ({ product }) => {
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-md">
      {product.image ? (
        <img
          src={product.image}
          alt={product.article}
          className="w-full aspect-square object-cover"
        />
      ) : (
        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">Pas d'image</span>
        </div>
      )}
      <div className="p-2">
        <h3 className="font-medium text-sm truncate">{product.article}</h3>
        <p className="text-xs text-gray-500">{product.price} FCFA</p>
      </div>
    </div>
  );
};

export default GalleryCard;

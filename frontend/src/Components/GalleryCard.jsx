import React from "react";

const GalleryCard = ({ product, setClickMedia, boutique }) => {
  return (
    <>
      <img
        onClick={() => setClickMedia({ type: "image", src: product.image })}
        src={product.image}
        className="w-full aspect-square object-cover"
        alt={product.name}
      />
      <div className="p-2 flex flex-col gap-1">
        <h3 className="font-medium text-xs line-clamp-2">{product.article}</h3>
        {product.price != null && (
          <p className="text-gray-600 font-bold text-sm">
            {product.price.toLocaleString()} FCFA
          </p>
        )}
        <div className="flex justify-between gap-1 items-center mt-1">
          <p className="border border-gray-300 text-xs rounded-full cursor-pointer p-1">
            commander
          </p>
          <a
            href={`https://wa.me/${
              boutique.whatsapp
            }?text=Bonjour, je suis intéressé par ${product.article}${
              product.price ? ` à ${product.price.toLocaleString()} FCFA` : ""
            }.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-900 text-white text-xs rounded-full p-1"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
};

export default GalleryCard;

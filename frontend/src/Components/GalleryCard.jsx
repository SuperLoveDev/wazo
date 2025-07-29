import React, { useContext } from "react";
import { MessageCircle } from "lucide-react";
import { CartContext } from "../Context/CartContext";

const GalleryCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const productToAdd = {
      productId: product._id,
      article: product.article,
      prix: product.price,
      image: product.image,
      quantity: 1,
    };
    addToCart(productToAdd);
  };

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden hover:shadow-md">
      {product.image ? (
        <img
          src={product.image}
          alt={product.article}
          className="w-full object-cover"
        />
      ) : (
        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">Pas d'image</span>
        </div>
      )}
      <div className="p-2">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          Article: {product.article}
        </h3>
        <p className="text-xm text-black border border-gray-200 bg-gray-100 rounded-2xl p-1">
          Desc: {product.description}
        </p>
        <p className="text-xm font-bold text-black mb-1 mt-1">
          Prix: {product.price} FCFA
        </p>
      </div>

      <div className="text-center flex flex-col justify-center items-center gap-1 mb-5">
        <button
          onClick={handleAddToCart}
          className="bg-black hover:bg-black/80 w-[150px] text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center justify-center transition-colors cursor-pointer"
        >
          Ajouet au panier
        </button>
        <a
          href={`https://wa.me/${product.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-800 hover:bg-green-700 w-[150px] text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-colors"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default GalleryCard;

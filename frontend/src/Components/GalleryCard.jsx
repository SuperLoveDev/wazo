import React, { useContext } from "react";
import { MessageCircle } from "lucide-react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const GalleryCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      article: product.article,
      prix: product.price,
      image: product.image,
      quantity: 1,
      boutiqueId: product.boutique,
      boutiqueName: product.boutiqueName || "Nom boutique inconnu",
    });
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md">
      <div className="" onClick={() => navigate(`/product/${product._id}`)}>
        <img
          src={product.image || "placeholder.jpg"}
          alt={product.article}
          loading="lazy"
          className="w-full object-cover aspect-square cursor-pointer"
        />
      </div>

      <div className="p-2 space-y-1">
        <h3 className="text-sm font-semibold truncate">
          Nom: {product.article}
        </h3>
        <p className="text-sm text-gray-600 border border-gray-100 bg-transparent p-1 rounded-lg">
          Desc: {product.description}
        </p>
        <p className="font-bold text-sm ">Prix: {product.price} FCFA</p>
      </div>

      <div className="flex flex-col items-center gap-2 p-2">
        <button
          onClick={handleAddToCart}
          className="bg-white border border-gray-200 hover:bg-black hover:text-white w-full text-black py-1.5 rounded-lg text-sm cursor-pointer transition-all"
        >
          Ajouter au panier
        </button>
        <a
          href={`https://wa.me/${product.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-700 hover:bg-green-600 w-full text-white py-1.5 rounded-lg text-sm flex items-center justify-center gap-1"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </div>
  );
};

export default GalleryCard;

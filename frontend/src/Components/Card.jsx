import React from "react";
import { Star } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, image, name, rating, article, adresse, whatsapp }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-auto max-w-xs bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
      {/* IMAGE avec RATION FIX */}
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          className="w-full h-full object-cover rounded-t-xl"
          alt={name}
          loading="lazy"
        />
      </div>

      {/* Contenu */}
      <div className="p-4 flex flex-col flex-grow space-y-2">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
            <Star size={16} className="fill-black-400 text-black-400" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 border border-gray-300 bg-white rounded-2xl p-2">
          Article: {article}
        </p>

        <p className="text-sm text-gray-600 line-clamp-2">
          <span className="font-medium">Adresse:</span> {adresse}
        </p>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate(`/catalogue/${id}`);
            }}
            className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors cursor-pointer"
          >
            Voir le catalogue →
          </button>

          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-800 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

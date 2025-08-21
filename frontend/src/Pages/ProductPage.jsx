import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { CartContext } from "../Context/CartContext";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams(); // productId
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/${id}`);
        console.log("PRODUCT FROM BACK :", res.data);
        setProduct(res.data.product);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center py-20">Chargement...</div>;
  }

  const handleAdd = () => {
    addToCart({
      productId: product._id,
      article: product.article,
      prix: product.price,
      image: product.image,
      quantity: 1,
      boutiqueId: product.boutique._id,
      boutiqueName: product.boutiqueName || "Nom boutique inconnu",
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      {/* RETOUR */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer mb-4"
      >
        <ArrowLeft /> <span>Retour</span>
      </div>

      {/* IMAGE + DETAILS */}
      <div className="flex flex-col lg:flex-row gap-8">
        <img
          src={product.image}
          alt={product.article}
          loading="lazy"
          className="w-full lg:w-1/2 rounded-xl object-cover max-h-[500px]"
        />

        <div className="flex flex-col gap-4 lg:w-1/2">
          <h1 className="text-3xl font-bold">{product.article}</h1>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                className={`${
                  i < (product.rating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-xl font-bold">{product.price} FCFA</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-sm text-gray-500">
            Boutique :{" "}
            <span className="font-semibold">{product.boutique.name}</span>
          </p>

          <button
            onClick={handleAdd}
            className="mt-4 bg-black text-white py-3 rounded-lg"
          >
            Ajouter au panier
          </button>

          <a
            href={`https://wa.me/${product.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-green-600 text-green-700 hover:bg-green-600 hover:text-white py-3 rounded-lg flex items-center justify-center mt-2"
          >
            Commander via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

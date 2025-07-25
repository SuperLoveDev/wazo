import React from "react";

const Cart = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Votre Panier Wazo
        </h1>

        <div className="border rounded-lg p-4 shadow-md flex flex-col gap-4 bg-gray-50">
          {/* Article 1 */}
          <div className="flex items-center gap-4 border-b pb-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Article"
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <p className="font-medium">T-shirt Wazo Premium</p>
              <p className="text-gray-500 text-sm">Taille: M</p>
            </div>
            <p className="font-semibold text-lg">25€</p>
          </div>

          {/* Article 2 */}
          <div className="flex items-center gap-4 border-b pb-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Article"
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <p className="font-medium">Casquette Wazo</p>
              <p className="text-gray-500 text-sm">Couleur: Noir</p>
            </div>
            <p className="font-semibold text-lg">15€</p>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between mt-4">
            <p className="font-semibold text-xl">Total</p>
            <p className="font-semibold text-xl">40€</p>
          </div>

          <button className="mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Passer la commande
          </button>
        </div>

        {/* Texte vivant en bas */}
        <div className="mt-6 text-center text-gray-600 text-sm max-w-md mx-auto">
          <p>
            Merci de faire confiance à{" "}
            <span className="font-semibold">Wazo</span> pour vos achats.
          </p>
          <p className="mt-1">
            Vos commandes seront traitées rapidement par nos boutiques
            partenaires, avec une livraison soignée à votre porte.
          </p>
          <p className="mt-1">
            Continuez à explorer le catalogue pour découvrir d'autres articles
            tendance et soutenir vos vendeurs locaux.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;

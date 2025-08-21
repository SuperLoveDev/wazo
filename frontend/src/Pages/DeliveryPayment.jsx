import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Truck } from "lucide-react";
import CartTotal from "../Components/CartTotal";

const DeliveryPayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { orderData, billingAddress } = state || {};

  const handleConfirm = async () => {
    try {
      if (!orderData?._id) {
        alert("Erreur: Données de commande manquantes");
        return;
      }

      console.log("orderData:", orderData);
      console.log("billingAddress:", billingAddress);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/cash-on-delivery`,
        {
          orderId: String(orderData._id),
          billingAddress,
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 5000,
        }
      );

      if (!res.data?.success) {
        throw new Error(res.data?.error || "Réponse invalide du serveur");
      }

      navigate("/order-confirmation", {
        state: {
          order: res.data.order,
          billingAddress,
        },
      });
    } catch (err) {
      console.error("Échec complet:", {
        message: err.message,
        response: err.response?.data,
        request: {
          url: err.config?.url,
          data: err.config?.data,
        },
      });
      alert(`Échec: ${err.response?.data?.message || err.message}`);
    }
  };

  if (!orderData) return navigate("/");

  // 💡 Flatten des produits provenant de toutes les boutiques
  const flattenedItems = orderData?.boutiques?.flatMap((b) => b.produits) || [];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Confirmation de commande</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Adresse */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Adresse de livraison</h2>
          <div className="space-y-2">
            <p>
              <strong>Nom :</strong> {billingAddress.nom}{" "}
              {billingAddress.prenom}
            </p>
            <p>
              <strong>Adresse :</strong> {billingAddress.adressedelivraison}
            </p>
            <p>
              <strong>Ville :</strong> {billingAddress.ville},{" "}
              {billingAddress.codepostal}
            </p>
            <p>
              <strong>Téléphone :</strong> {billingAddress.numero}
            </p>
            <p>
              <strong>E-mail :</strong> {billingAddress.mail}
            </p>
          </div>
        </div>

        {/* Commande */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Détails de la commande</h2>

          {/* ✅ On passe maintenant un tableau "plat" de produits */}
          <CartTotal items={flattenedItems} deliveryFee={orderData.livraison} />

          <div className="mt-4">
            <h3 className="font-medium">Mode de paiement</h3>
            <p className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Paiement à la livraison (Cash)
            </p>
          </div>

          <button
            onClick={handleConfirm}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Confirmer définitivement
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPayment;

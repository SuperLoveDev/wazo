import React from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const CashConfirmation = () => {
  const { state } = useLocation();
  const { order, orderData } = state || {};
  const displayOrder = order || orderData;

  if (!displayOrder) return <div className="p-4">Commande introuvable</div>;

  // Formatage de la date
  const orderDate = new Date(
    displayOrder.createdAt || new Date()
  ).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* En-tête */}
      <div className="text-center mb-8">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-gray-800">
          Merci. Votre commande a été reçue.
        </h1>
      </div>

      {/* Résumé de la commande */}
      <div className="border-b pb-4 mb-6">
        <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-semibold">Numéro de commande</p>
            <p>{displayOrder._id}</p>
          </div>
          <div>
            <p className="font-semibold">Date</p>
            <p>{orderDate}</p>
          </div>
          <div>
            <p className="font-semibold">Total</p>
            <p>{displayOrder.total?.toLocaleString("fr-FR")} CFA</p>
          </div>
          <div>
            <p className="font-semibold">Méthode de paiement</p>
            <p>Paiement à la livraison</p>
          </div>
        </div>
      </div>

      {/* Notification de paiement */}
      <div className="bg-blue-50 p-4 rounded-md mb-8">
        <p className="text-blue-800 font-medium">
          Payer en argent comptant à la livraison.
        </p>
      </div>

      {/* Détails de la commande */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Détails de la commande</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 font-semibold">Produit</th>
              <th className="text-right py-3 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {displayOrder.items?.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3">
                  {item.name} × {item.quantity}
                </td>
                <td className="text-right py-3">
                  {(item.prix * item.quantity)?.toLocaleString("fr-FR")} CFA
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-b">
              <td className="py-3 font-semibold">Sous-total :</td>
              <td className="text-right py-3">
                {displayOrder.subtotal?.toLocaleString("fr-FR")} CFA
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3 font-semibold">Expédition :</td>
              <td className="text-right py-3">
                {displayOrder.livraison?.toLocaleString("fr-FR")} CFA via
                Fretail
              </td>
            </tr>
            <tr>
              <td className="py-3 font-semibold">Total :</td>
              <td className="text-right py-3 font-bold">
                {displayOrder.total?.toLocaleString("fr-FR")} CFA
              </td>
            </tr>
            <tr>
              <td className="py-3 font-semibold">Moyen de paiement :</td>
              <td className="text-right py-3">Paiement à la livraison</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Retour à l'accueil
        </button>
        <button
          onClick={() => window.print()}
          className="text-blue-600 hover:text-blue-800"
        >
          Imprimer la confirmation
        </button>
      </div>
    </div>
  );
};

export default CashConfirmation;

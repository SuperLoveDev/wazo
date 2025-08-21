import React, { useEffect, useState } from "react";
import axios from "axios";

const Order = ({ boutiqueId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/order/by-boutique/${boutiqueId}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Erreur chargement commandes :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [boutiqueId]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mes Commandes</h2>

      {/* Version mobile */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded p-4 shadow bg-white">
            <p className="font-semibold">Commande : {order._id}</p>
            <p>Client : {order.client}</p>
            <p>
              Produits :{" "}
              {order.products.map((p) => `${p.name} x${p.qty}`).join(", ")}
            </p>
            <p>Total : {order.total.toLocaleString()} FCFA</p>
            <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            <p>Statut : {order.status}</p>
            <div className="mt-2 space-x-2">
              {order.status === "awaiting_shipment" && (
                <>
                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    Valider
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Annuler
                  </button>
                </>
              )}
              {order.status === "shipped" && (
                <span className="text-green-600 font-semibold">Expédié</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/*  Version desktop */}
      <table className="hidden md:table w-full border-collapse border mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Commande</th>
            <th className="p-2 border">Client</th>
            <th className="p-2 border">Produits</th>
            <th className="p-2 border">Total (FCFA)</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Statut</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-center">
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">{order.client}</td>
              <td className="border p-2">
                {order.products.map((product, index) => (
                  <div key={`${product.name}-${index}`}>
                    {product.name} x{product.qty}
                  </div>
                ))}
              </td>

              <td className="border p-2">{order.total.toLocaleString()}</td>
              <td className="border p-2">
                {new Date(order.date).toLocaleDateString()}
              </td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2 space-x-2">
                {order.status === "awaiting_shipment" && (
                  <>
                    <button className="bg-green-800 text-white px-2 py-1 rounded">
                      Valider
                    </button>
                    <button className="bg-red-700 text-white px-2 py-1 rounded">
                      Annuler
                    </button>
                  </>
                )}
                {order.status === "shipped" && (
                  <span className="text-green-600 font-semibold">Expédié</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;

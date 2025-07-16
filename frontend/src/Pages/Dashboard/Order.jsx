import React from "react";

const ordersMock = [
  {
    id: "1",
    client: "Jean Dupont",
    products: [
      { name: "Chemise Wax", qty: 2 },
      { name: "Sac en Pagnes", qty: 1 },
    ],
    total: 35000,
    date: "2025-07-15",
    status: "En attente",
  },
  {
    id: "2",
    client: "Awa Traoré",
    products: [{ name: "Robe Ankara", qty: 1 }],
    total: 15000,
    date: "2025-07-14",
    status: "Expédié",
  },
];

const Order = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mes Commandes</h2>

      {/* Version mobile (default) : cartes empilées */}
      <div className="md:hidden space-y-4">
        {ordersMock.map((order) => (
          <div key={order.id} className="border rounded p-4 shadow bg-white">
            <p className="font-semibold">Commande : {order.id}</p>
            <p>Client : {order.client}</p>
            <p>
              Produits :{" "}
              {order.products.map((p) => `${p.name} x${p.qty}`).join(", ")}
            </p>
            <p>Total : {order.total} FCFA</p>
            <p>Date : {order.date}</p>
            <p>Statut : {order.status}</p>
            <div className="mt-2 space-x-2">
              {order.status === "En attente" && (
                <>
                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    Valider
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Annuler
                  </button>
                </>
              )}
              {order.status === "Expédié" && (
                <span className="text-green-600 font-semibold">Expédié</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Version desktop : tableau */}
      <table className="hidden md:table w-full border-collapse border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Commande</th>
            <th className="border border-gray-300 p-2">Client</th>
            <th className="border border-gray-300 p-2">Produits</th>
            <th className="border border-gray-300 p-2">Total (FCFA)</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Statut</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ordersMock.map((order) => (
            <tr key={order.id} className="text-center">
              <td className="border border-gray-300 p-2">{order.id}</td>
              <td className="border border-gray-300 p-2">{order.client}</td>
              <td className="border border-gray-300 p-2">
                {order.products.map((product) => (
                  <div key={product.name}>
                    {product.name} x{product.qty}
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 p-2">{order.total}</td>
              <td className="border border-gray-300 p-2">{order.date}</td>
              <td className="border border-gray-300 p-2">{order.status}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                {order.status === "En attente" && (
                  <>
                    <button className="bg-green-800 text-white px-2 py-1 rounded">
                      Valider
                    </button>
                    <button className="bg-red-700 text-white px-2 py-1 rounded">
                      Annuler
                    </button>
                  </>
                )}
                {order.status === "Expédié" && (
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

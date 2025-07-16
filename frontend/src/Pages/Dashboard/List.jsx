import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const List = () => {
  // Données statiques exemple pour structure
  const products = [
    { id: "p1", article: "Robe Ankara", price: 15000 },
    { id: "p2", article: "Chemise Wax", price: 10000 },
    { id: "p3", article: "Jeans", price: 8000 },
    { id: "p4", article: "Sandales Africaines", price: 8000 },
    { id: "p5", article: "Blazer", price: 8000 },
    { id: "p6", article: "Costume", price: 8000 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">📦 Liste des Produits</h2>
      <table className="min-w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Nom</th>
            <th className="p-2 border">Prix (FCFA)</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="p-2 border">{product.article}</td>
              <td className="p-2 border">{product.price.toLocaleString()}</td>
              <td className="p-2 border flex gap-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-1">
                  <Pencil size={16} />
                  Modifier
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1">
                  <Trash2 size={16} />
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;

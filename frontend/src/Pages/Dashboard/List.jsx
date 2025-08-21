import React, { useContext, useEffect, useState } from "react";

import { ShopContext } from "../../Context/ShopContext";
import { Pencil, Trash2, Save, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const { selectedBoutique } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    productId: "",
    article: "",
    description: "",
    price: 0,
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!selectedBoutique) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/product/list/${selectedBoutique._id}`
        );
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      }
    };

    fetchProducts();
  }, [selectedBoutique, backendUrl]);

  // Fonction de suppression (conservée telle quelle)
  const handleDelete = async (productId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${backendUrl}/api/product/delete/${productId}`
      );

      if (response.data.success) {
        toast.success("Produit supprimé avec succès");
        setProducts(products.filter((product) => product._id !== productId));
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Échec de la suppression");
    }
  };

  // Fonction pour activer le mode édition
  const handleEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      productId: product._id,
      article: product.article,
      description: product.description || "",
      price: product.price,
    });
  };

  // Fonction pour sauvegarder les modifications
  const handleUpdate = async () => {
    try {
      // Validation frontend
      if (!editForm.article || !editForm.price) {
        toast.error("Le nom et le prix sont obligatoires");
        return;
      }

      const payload = {
        productId: editForm.productId,
        article: editForm.article,
        price: Number(editForm.price),
        description: editForm.description || "",
      };

      const response = await axios.put(
        `${backendUrl}/api/product/update`,
        payload
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setProducts(
          products.map((p) =>
            p._id === editingId ? { ...p, ...response.data.updateItem } : p
          )
        );
        setEditingId(null);
      } else {
        toast.error(response.data.message || "Erreur inconnue");
      }
    } catch (error) {
      console.error("Erreur détaillée:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });
      toast.error(error.response?.data?.message || "Échec de la modification");
    }
  };

  // Fonction pour annuler l'édition
  const cancelEdit = () => {
    setEditingId(null);
  };

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
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="p-2 border">
                {editingId === product._id ? (
                  <input
                    type="text"
                    value={editForm.article}
                    onChange={(e) =>
                      setEditForm({ ...editForm, article: e.target.value })
                    }
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  product.article
                )}
              </td>
              <td className="p-2 border">
                {editingId === product._id ? (
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  product.price.toLocaleString()
                )}
              </td>
              <td className="p-2 border flex gap-2">
                {editingId === product._id ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1"
                    >
                      <Save size={16} />
                      Sauvegarder
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded flex items-center gap-1"
                    >
                      <X size={16} />
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-1"
                    >
                      <Pencil size={16} />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;

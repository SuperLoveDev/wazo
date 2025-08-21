import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(localStorage.getItem("cartId"));
  const [cartItems, setCartItems] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Initialisation
  useEffect(() => {
    if (cartId) {
      axios.get(`${backendUrl}/api/cart/${cartId}`).then((res) => {
        setCartItems(res.data.items || []);
      });
    } else {
      const newCartId = crypto.randomUUID();
      setCartId(newCartId);
      localStorage.setItem("cartId", newCartId);
    }
  }, [cartId]);

  const addToCart = async (product) => {
    try {
      if (!product.productId || !product.boutiqueId || !product.boutiqueName) {
        console.error(
          "Chaque produit doit avoir productId, boutiqueId et boutiqueName !"
        );
        return;
      }

      setCartItems((prev) => [...prev, product]);

      // Envoyer la mise à jour au backend
      await axios.post(`${backendUrl}/api/cart/${cartId}`, {
        product,
      });
    } catch (err) {
      console.error("Erreur ajout au panier", err);
    }
  };

  const deletCart = async (productId) => {
    const updated = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updated);
    await axios.delete(`${backendUrl}/api/cart/${cartId}/${productId}`);
  };

  const updateCart = async (productId, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);

    await axios.put(`${backendUrl}/api/cart/${cartId}`, {
      items: updatedItems,
    });
  };

  const clearCart = async () => {
    setCartItems([]);
    if (cartId) {
      await axios.delete(`${backendUrl}/api/cart/${cartId}/all`);
    }
    const newCartId = crypto.randomUUID();
    setCartId(newCartId);
    localStorage.setItem("cartId", newCartId);
  };

  return (
    <CartContext.Provider
      value={{
        cartId,
        cartItems,
        addToCart,
        deletCart,
        updateCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

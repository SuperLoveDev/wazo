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
      const res = await axios.post(`${backendUrl}/api/cart/${cartId}`, {
        product: {
          ...product,
          quantity: product.quantity || 1,
        },
      });

      // Mise à jour optimiste du state
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.productId === product.productId
        );
        if (existingItem) {
          return prevItems.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + (product.quantity || 1) }
              : item
          );
        }
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      });

      return res.data.items;
    } catch (err) {
      console.error("Erreur lors de l'ajout au panier", err);
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

  return (
    <CartContext.Provider
      value={{
        cartId,
        cartItems,
        addToCart,
        deletCart,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

import Cart from "../models/cartModel.js";

// GET: récupérer le panier par cartId
const getCart = async (req, res) => {
  const { cartId } = req.params;
  const cart = await Cart.findOne({ cartId });

  if (!cart) {
    return res.json({ cartId, items: [] });
  }

  // Assure que le format est toujours le même
  res.json({
    cartId: cart.cartId,
    items: cart.items || [],
  });
};

// POST: ajouter un produit au panier
const addToCart = async (req, res) => {
  const { cartId } = req.params;
  const { product } = req.body;

  try {
    // Trouve le panier ou en crée un nouveau
    let cart = await Cart.findOne({ cartId });

    if (!cart) {
      cart = new Cart({
        cartId,
        items: [
          {
            ...product,
            quantity: product.quantity || 1,
          },
        ],
      });
    } else {
      // Cherche l'index du produit existant
      const itemIndex = cart.items.findIndex(
        (item) => item.productId === product.productId
      );

      if (itemIndex > -1) {
        // Incrémente la quantité si le produit existe déjà
        cart.items[itemIndex].quantity += product.quantity || 1;
      } else {
        // Ajoute le produit s'il n'existe pas
        cart.items.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }
    }

    // Sauvegarde et retourne le panier mis à jour
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Erreur addToCart:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT: mise à jour des items du panier
const updateCart = async (req, res) => {
  const { cartId } = req.params;
  const { items } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { cartId },
      { items },
      { new: true, upsert: true }
    );
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du panier" });
  }
};

// DELETE: retirer un produit du panier
const deleteCart = async (req, res) => {
  const { cartId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ cartId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Panier introuvable" });
    }

    cart.items = cart.items.filter((item) => item.productId !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Impossible de supprimer l'article" });
  }
};

export { getCart, addToCart, updateCart, deleteCart };

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
    let cart = await Cart.findOne({ cartId });

    if (!cart) {
      // créer le panier s'il n'existe pas
      cart = new Cart({ cartId, items: [] });
    }

    const existingProduct = cart.items.find(
      (item) => item.productId === product.productId
    );

    if (existingProduct) {
      existingProduct.quantity += product.quantity || 1;
    } else {
      cart.items.push(product);
    }

    await cart.save();
    res.status(200).json({ items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur ajout au panier" });
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

const clearCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    await Cart.findOneAndUpdate(
      { cartId },
      { items: [] },
      { new: true, upsert: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getCart, addToCart, updateCart, deleteCart, clearCart };

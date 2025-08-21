import Order from "../models/orderModel.js";
import Boutique from "../models/boutiqueModel.js";
import { sendOrderConfirmation } from "../services/emailService.js";

export const createOrder = async (req, res) => {
  try {
    const { buyer, items, subtotal, livraison, totalAmount, paymentMethod } =
      req.body;

    // Grouper les produits par boutique
    const boutiquesMap = {};
    for (const item of items) {
      if (!boutiquesMap[item.boutiqueId]) {
        boutiquesMap[item.boutiqueId] = [];
      }
      boutiquesMap[item.boutiqueId].push(item);
    }

    const boutiquesArray = [];
    for (const boutiqueId in boutiquesMap) {
      const produits = boutiquesMap[boutiqueId];
      const totalBoutique = produits.reduce(
        (sum, p) => sum + p.prix * p.quantity,
        0
      );

      boutiquesArray.push({
        boutiqueId,
        produits,
        totalBoutique,
      });

      // Mettre à jour stats boutique
      await Boutique.findByIdAndUpdate(boutiqueId, {
        $inc: { totalSales: totalBoutique, ordersCount: 1 },
      });
    }

    const newOrder = new Order({
      buyer,
      boutiques: boutiquesArray,
      subtotal,
      livraison,
      totalAmount,
      paymentMethod,
    });

    await newOrder.save();

    //PDF RECU / RECEIPT
    await sendOrderConfirmation(newOrder);

    res.status(201).json({ message: "Commande enregistrée", order: newOrder });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la commande" });
  }
};

// Récupérer une commande par ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "boutiques.boutiqueId"
    );

    if (!order) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la commande" });
  }
};

// Changer le paiement en "Cash on Delivery"
export const cashOnDelivery = async (req, res) => {
  try {
    const { orderId, billingAddress } = req.body;
    console.log("Order ID reçu:", orderId);

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    order.paymentMethod = "cash-on-delivery";
    order.status = "confirmed";
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la commande" });
  }
};

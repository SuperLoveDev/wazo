import express from "express";
import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Boutique from "../models/boutiqueModel.js";
import axios from "axios";
import {
  sendOrderConfirmation,
  sendOwnerNotification,
} from "../services/emailService.js";

const orderRouter = express.Router();

// Route pour le checkout général
orderRouter.post("/checkout", async (req, res) => {
  try {
    const { buyer, items, livraison, paymentMethod } = req.body;

    if (!buyer || !items?.length) {
      return res.status(400).json({ error: "Données manquantes" });
    }

    // Calcul du total
    const subtotal = items.reduce(
      (sum, it) => sum + Number(it.prix) * Number(it.quantity),
      0
    );
    const totalAmount = subtotal + Number(livraison || 0);

    // Création de la commande
    const order = new Order({
      buyer,
      items,
      subtotal,
      livraison,
      total: totalAmount,
      paymentMethod,
      status: paymentMethod === "livraison" ? "awaiting_shipment" : "pending",
      billingAddress: buyer,
    });
    await order.save();

    switch (paymentMethod) {
      case "cinetpay":
        const transactionId = `txn_${Date.now()}`;
        const paymentData = {
          apikey: process.env.CINETPAY_API_KEY,
          site_id: process.env.CINETPAY_SITE_ID,
          transaction_id: transactionId,
          amount: totalAmount,
          currency: "XOF",
          description: `Commande ${order._id}`,
          customer_name: buyer.nom,
          customer_surname: buyer.prenom,
          customer_phone_number: buyer.numero,
          return_url: `${process.env.FRONTEND_URL}/confirmation`,
          notify_url: `${process.env.BACKEND_URL}/api/payment/cinetpay/callback`,
        };

        const response = await axios.post(
          "https://api-checkout.cinetpay.com/v2/payment",
          paymentData
        );
        return res.json({ payment_url: response.data.data.payment_url });

      case "carte":
        return res
          .status(501)
          .json({ error: "Paiement par carte non implémenté" });

      case "livraison":
        // Envoi mail au client
        await sendOrderConfirmation(order);

        // Envoi mail au(x) propriétaire(s)
        const boutiqueIds = [
          ...new Set(order.items.map((item) => item.boutiqueId.toString())),
        ];
        for (const boutiqueId of boutiqueIds) {
          const boutique = await Boutique.findById(boutiqueId);
          if (boutique?.email) {
            sendOwnerNotification(order, boutique);
          }
        }

        return res.json({
          success: true,
          order,
          redirectUrl: "/confirmation",
        });

      default:
        return res.status(400).json({ error: "Méthode de paiement invalide" });
    }
  } catch (err) {
    console.error("Erreur checkout:", err);
    res.status(500).json({
      error: "Erreur serveur",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// Route spécifique pour paiement à la livraison
orderRouter.post("/cash-on-delivery", async (req, res) => {
  try {
    const { orderId, billingAddress } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: "ID de commande invalide" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status: "awaiting_shipment",
        ...(billingAddress && { billingAddress }),
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Commande introuvable" });
    }

    // Envoi mail au client
    await sendOrderConfirmation(order);

    // Envoi mail au(x) propriétaire(s)
    const boutiqueIds = [
      ...new Set(order.items.map((item) => item.boutiqueId.toString())),
    ];
    for (const boutiqueId of boutiqueIds) {
      const boutique = await Boutique.findById(boutiqueId);
      if (boutique?.email) {
        sendOwnerNotification(order, boutique);
      }
    }

    res.json({
      success: true,
      order: {
        _id: order._id,
        total: order.total,
        items: order.items,
      },
      message: "Paiement à la livraison confirmé",
    });
  } catch (err) {
    console.error("Erreur confirmation livraison:", err);
    res.status(500).json({
      error: "Erreur serveur",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// renvoie toutes les commandes d'une boutique donnée
orderRouter.get("/by-boutique/:boutiqueId", async (req, res) => {
  try {
    const { boutiqueId } = req.params;

    const orders = await Order.find({
      "items.boutiqueId": boutiqueId,
    }).sort({ createdAt: -1 });
    const filtered = orders.map((order) => {
      const produitsBoutique = order.items.filter(
        (it) => it.boutiqueId.toString() === boutiqueId
      );

      const totalBoutique = produitsBoutique.reduce(
        (s, it) => s + it.prix * it.quantity,
        0
      );

      return {
        _id: order._id,
        client: `${order.buyer.nom} ${order.buyer.prenom}`,
        products: produitsBoutique.map((p) => ({
          name: p.name,
          qty: p.quantity,
          prix: p.prix,
        })),
        total: totalBoutique,
        date: order.createdAt,
        status: order.status,
      };
    });

    res.json(filtered);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors du chargement des commandes" });
  }
});

export default orderRouter;

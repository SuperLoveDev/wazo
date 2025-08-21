import express from "express";
import Order from "../models/orderModel.js";
import Boutique from "../models/boutiqueModel.js";

const paymentRouter = express.Router();

const CINETPAY_URL = "https://api-checkout.cinetpay.com/v2/payment";
const API_KEY = process.env.CINETPAY_API_KEY;
const SITE_ID = process.env.CINETPAY_SITE_ID;

paymentRouter.post("/cinetpay", async (req, res) => {
  const { nom, prenom, numero, montant, cartId } = req.body;
  const transaction_id = `${cartId}-${Date.now()}`;

  try {
    const response = await axios.post(CINETPAY_URL, {
      apikey: API_KEY,
      site_id: SITE_ID,
      transaction_id,
      amount: montant,
      currency: "XOF",
      description: "Paiement commande",
      customer_name: nom,
      customer_surname: prenom,
      customer_phone_number: numero,
      channels: "ALL",
      return_url: `https://localhost:5173/confirmation`,
      notify_url: `https://localhost:4000/api/payment/cinetpay/callback`,
    });

    res.json({ payment_url: response.data.data.payment_url });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Erreur création transaction" });
  }
});

const router = express.Router();

paymentRouter.post("/cinetpay/callback", async (req, res) => {
  const { transaction_id, status } = req.body;

  try {
    if (status === "ACCEPTED") {
      const order = await Order.findOne({ paymentReference: transaction_id });

      if (order) {
        // Créditer chaque boutique
        for (const boutique of order.boutiques) {
          await Boutique.findByIdAndUpdate(boutique.boutiqueId, {
            $inc: { solde: boutique.montant },
          });
        }
        order.status = "paid";
        await order.save();
      }
    }
    res.status(200).end(); // Réponse obligatoire pour CinetPay
  } catch (err) {
    console.error("Erreur webhook:", err);
    res.status(500).end();
  }
});

export default paymentRouter;

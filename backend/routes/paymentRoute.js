import express from "express";
import axios from "axios";

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

paymentRouter.post("/cinetpay/callback", async (req, res) => {
  const { transaction_id, amount, payment_method, status } = req.body;

  if (status === "ACCEPTED") {
    console.log("PAIEMENT VALIDÉ:", { transaction_id, amount });
  } else {
    console.log("Paiement échoué:", { status, transaction_id });
  }

  res.sendStatus(200);
});

export default paymentRouter;

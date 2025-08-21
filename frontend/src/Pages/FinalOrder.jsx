// pages/Commande.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../Context/CartContext";

const FinalOrder = () => {
  const { cartItems } = useContext(CartContext);
  const [form, setForm] = useState({ nom: "", prenom: "", numero: "" });

  const total = cartItems.reduce(
    (acc, item) => acc + item.prix * item.quantity,
    0
  );

  const handlePay = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/payment/cinetpay",
        {
          nom: form.nom,
          prenom: form.prenom,
          numero: form.numero,
          montant: total,
          cartId: Date.now(),
        }
      );
      window.location.href = res.data.payment_url; // redirige vers CinetPay
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Finaliser la commande</h2>
      <input
        placeholder="Nom"
        value={form.nom}
        onChange={(e) => setForm({ ...form, nom: e.target.value })}
      />
      <input
        placeholder="Prénom"
        value={form.prenom}
        onChange={(e) => setForm({ ...form, prenom: e.target.value })}
      />
      <input
        placeholder="Numéro"
        value={form.numero}
        onChange={(e) => setForm({ ...form, numero: e.target.value })}
      />
      <button onClick={handlePay}>Payer {total} FCFA</button>
    </div>
  );
};

export default FinalOrder;

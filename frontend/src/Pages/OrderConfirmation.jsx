import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { confiances } from "../assets/assets";
import { CreditCard, Truck } from "lucide-react";
import FormInput from "../Components/FormInput";
import PaymentOption from "../Components/PaymentOption";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  nom: yup.string().required("Votre nom est requis"),
  prenom: yup.string().required("Votre prénom est requis"),
  numero: yup.string().required("Numéro requis"),
  mail: yup.string().required("votre e-mail est requis pour la facture"),
  pays: yup.string().required("Pays requis"),
  region: yup.string().required("Région requise"),
  codepostal: yup.string().required("Code postal requis"),
  ville: yup.string().required("Ville requise"),
  adressedelivraison: yup.string().required("Adresse requise"),
});

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [payment, setPayment] = useState("cinetpay");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const formSubmit = async (data) => {
    if (!cartItems.length) return alert("Votre panier est vide !");

    try {
      const orderPayload = {
        buyer: data,
        items: cartItems.map((it) => ({
          productId: it.productId,
          name: it.article || it.name || it.nom,
          prix: Number(it.prix || it.price || 0),
          quantity: Number(it.quantity || 1),
          boutiqueId: it.boutiqueId,
        })),
        livraison: 1000,
        paymentMethod: payment,
      };

      if (payment === "livraison") {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/checkout`,
          orderPayload,
          { headers: { "Content-Type": "application/json" } }
        );
        reset();
        clearCart();
        navigate("/delivery-payment", {
          state: { orderData: res.data.order, billingAddress: data },
        });
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/checkout`,
        orderPayload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (payment === "livraison") {
        alert("Commande confirmée ! Paiement à la livraison.");
        // Redirection ou reset du panier
      } else if (res.data?.payment_url) {
        window.location.href = res.data.payment_url;
      }
    } catch (err) {
      console.error("Erreur checkout:", err.response?.data || err.message);
      alert("Erreur lors du paiement. Vérifie la console.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-15 min-h-[80vh] mt-20"
    >
      {/* Partie gauche - Formulaire de livraison (inchangé) */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <Title text1="Information livraison" />
        <div className="flex gap-3">
          <FormInput
            name="nom"
            placeholder="Nom"
            register={register}
            error={errors.nom}
          />
          <FormInput
            name="prenom"
            placeholder="Prénom"
            register={register}
            error={errors.prenom}
          />
        </div>
        <FormInput
          name="numero"
          placeholder="Numéro"
          register={register}
          error={errors.numero}
        />
        <FormInput
          name="mail"
          placeholder="votre e-mail"
          register={register}
          error={errors.mail}
        />
        <FormInput
          name="pays"
          placeholder="Pays"
          register={register}
          error={errors.pays}
        />
        <FormInput
          name="region"
          placeholder="Région"
          register={register}
          error={errors.region}
        />
        <FormInput
          name="codepostal"
          placeholder="Code postal"
          register={register}
          error={errors.codepostal}
        />
        <FormInput
          name="ville"
          placeholder="Ville"
          register={register}
          error={errors.ville}
        />
        <FormInput
          name="adressedelivraison"
          placeholder="Adresse de livraison"
          register={register}
          error={errors.adressedelivraison}
        />
      </div>

      {/* Partie droite - Paiement */}
      <div className="mt-8 h-[80vh]">
        <div className="border border-gray-300 mt-8 min-w-70">
          <CartTotal />
        </div>

        <div className="border border-gray-300 flex flex-col mt-8 p-4">
          {/* Option CinetPay */}
          <PaymentOption
            value="cinetpay"
            selected={payment}
            onChange={setPayment}
            label="Paiement via carte ou mobile money"
            icon={
              <img
                className="w-25"
                src={confiances.cinetpay}
                alt="cinetpay"
                loading="lazy"
              />
            }
          />

          {/* Option Carte Bancaire */}
          <PaymentOption
            value="carte"
            selected={payment}
            onChange={setPayment}
            label="Paiement par carte bancaire"
            icon={<CreditCard className="h-5 w-5" />}
          />

          {/* Option À la livraison */}
          <PaymentOption
            value="livraison"
            selected={payment}
            onChange={setPayment}
            label="Payer à la livraison (cash)"
            icon={<Truck className="h-5 w-5" />}
          />

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="w-[230px] border bg-black text-white p-4 rounded cursor-pointer mb-4 hover:bg-gray-800 transition-colors"
            >
              {payment === "livraison"
                ? "Confirmer la commande"
                : "Payer maintenant"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OrderConfirmation;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { confiances } from "../assets/assets";
import { CreditCard } from "lucide-react";
import FormInput from "../Components/FormInput";
import PaymentOption from "../Components/PaymentOption";

// form schema
const schema = yup.object({
  nom: yup.string().required("Votre nom est requis"),
  prenom: yup.string().required("Votre prénom est requis"),
  numero: yup.string().required("Numéro requis pour la livraison"),
  pays: yup.string().required("Pays requis"),
  region: yup.string().required("Région requise"),
  codepostal: yup.string().required("Code postal requis"),
  ville: yup.string().required("Ville requise"),
  adressedelivraison: yup.string().required("Adresse requise"),
});

const OrderConfirmation = () => {
  const [payment, setPayment] = useState("pal");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const formSubmit = (data) => {
    console.log(data);
    console.log(payment);
    // Redirection ou envoi au serveur
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-15 min-h-[80vh]"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <Title text1={"information livraison"} />

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
          placeholder="Adresse de livraison*"
          register={register}
          error={errors.adressedelivraison}
        />
      </div>

      <div className="mt-8">
        <div className="border border-gray-300 mt-8 min-w-70">
          <CartTotal />
        </div>

        <div className="border border-gray-300 flex flex-col mt-8">
          <PaymentOption
            value="pal"
            selected={payment}
            onChange={setPayment}
            label="Paiement à la livraison"
          />
          <PaymentOption
            value="cinetpay"
            selected={payment}
            onChange={setPayment}
            label="Paiement via carte ou mobile money"
            icon={
              <img className="w-25" src={confiances.cinetpay} alt="cinetpay" />
            }
          />
          <PaymentOption
            value="card"
            selected={payment}
            onChange={setPayment}
            label="Payer par carte"
            icon={
              <div className="inline-flex p-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded">
                <CreditCard className="text-white" size={24} />
              </div>
            }
          />

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="w-[230px] border bg-black text-white p-4 rounded cursor-pointer mb-4 hover:bg-gray-800 transition-colors"
            >
              Je finalise
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OrderConfirmation;

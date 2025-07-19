import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  nomcomplet: yup.string().required("votre nom est requi"),
  numero: yup.string().required("votre numero est requis"),
  motdepasse: yup
    .string()
    .min(4, "Min 4 caractèers")
    .required("mot de passe requis"),
});

const Client = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <div className="border border-gray-100 rounded-lg p-6 shadow-2xl">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-4">
              <label className="block mb-2">Nom Complet</label>
              <input
                {...register("nomcomplet")}
                type="text"
                placeholder="votre nom"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              {errors.numero && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.numero.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Numero</label>
              <input
                {...register("numero")}
                type="text"
                placeholder="votre numero"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              {errors.numero && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.numero.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">Mot De Passe</label>
              <input
                {...register("motdepasse")}
                type="password"
                placeholder="mot de passe"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              {errors.motdepasse && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.motdepasse.message}
                </p>
              )}
            </div>
            <button
              className="w-full bg-black text-white p-3 rounded-lg mt-4 hover:bg-gray-800 transition-colors"
              type="submit"
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Client;

import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  numero: yup.string().required("votre numero est requis"),
  motdepasse: yup
    .string()
    .min(4, "Min 4 caractèers")
    .required("mot de passe requis"),
});

const Login = () => {
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
    <div className="w-full">
      <div className="flex flex-col items-center mx-auto">
        <h1 className="text-4xl">Mon Tableau</h1>
        <div className="w-1/2">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-3 min-w-[72] text-center">
              <p>Numero</p>
              <input
                {...register("numero")}
                type="text"
                placeholder="votre numero"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              {errors.numero && (
                <p className="text-red-500 text-sm">{errors.numero.message}</p>
              )}
            </div>

            <div className="mb-3 min-w-[72] text-center">
              <p>Mot De Passe</p>
              <input
                {...register("motdepasse")}
                type="mot de passe"
                placeholder="mot de passe"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              {errors.motdepasse && (
                <p className="text-red-500 text-sm">
                  {errors.motdepasse.message}
                </p>
              )}
            </div>
            <button
              className="w-full border bg-black text-white p-2 rounded-lg mt-5"
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

export default Login;

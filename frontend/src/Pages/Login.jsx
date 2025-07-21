import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  numero: yup.string().required("votre numero est requis"),
  motdepasse: yup
    .string()
    .min(4, "Min 4 caractèers")
    .required("mot de passe requis"),
});

const Client = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = (data) => {
    console.log(data);

    toast.success("Patienter !", {
      onClose: () => navigate("/boutique"),
      bodyClassName: "text-3xl",
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    reset();
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-purple-100 to-red-50">
      <div className="w-full max-w-md p-6">
        <p className="text-center text-5xl mb-15">Wazo</p>
        <div className="border border-gray-100 rounded-lg p-6 shadow-2xl">
          <form onSubmit={handleSubmit(formSubmit)}>
            <p className="text-center text-gray-700 mb-10">
              Se connecter a ma boutique Wazo
            </p>
            <div className="mb-10">
              {/* <label className="block mb-2">Numero</label> */}
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

            <div className="mb-10">
              {/* <label className="block mb-2">Mot De Passe</label> */}
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
              className="w-full bg-black text-white p-3 rounded-lg mt-2 hover:bg-gray-800 transition-colors"
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

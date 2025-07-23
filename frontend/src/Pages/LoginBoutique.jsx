import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = yup.object().shape({
  whatsapp: yup
    .string()
    .matches(/^0\d{9}$/, "Numéro invalide (ex: 0780099382)")
    .required("Votre numéro est requis"),
  motdepasse: yup
    .string()
    .min(4, "Min 4 caractèers")
    .required("mot de passe requis"),
});

const LoginBoutique = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const whatsappNormalized = data.whatsapp.replace(/\D/g, "");

      const response = await axios.post(
        `${backendUrl}/api/creerboutique/loginboutique`,
        {
          whatsapp: whatsappNormalized,
          motdepasse: data.motdepasse,
        }
      );
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("boutiqueToken", token);

        toast.success("Connexion réussie!", {
          bodyClassName: "text-3xl",
          position: "top-center",
          autoClose: 2000,
          onClose: () => navigate(`/boutique`),
        });

        reset();
      } else {
        toast.error(response.data.message || "Erreur de connexion", {
          bodyClassName: "text-xl",
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      toast.error(
        error.response?.data?.message || "Erreur serveur lors de la connexion",
        {
          bodyClassName: "text-xl",
          position: "top-center",
        }
      );
    }
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
                {...register("whatsapp")}
                type="text"
                placeholder="votre numero"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              {errors.whatsapp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.whatsapp.message}
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

export default LoginBoutique;

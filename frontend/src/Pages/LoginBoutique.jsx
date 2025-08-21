import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";

const schema = yup.object().shape({
  whatsapp: yup
    .string()
    .matches(/^0\d{9}$/, "Numéro invalide (ex: 0707070707)")
    .required("Votre numéro est requis"),
  motdepasse: yup
    .string()
    .min(4, "Min 4 caractères")
    .required("Mot de passe requis"),
});

const LoginBoutique = () => {
  const navigate = useNavigate();
  const { loginBoutique, backendUrl } = useContext(ShopContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    try {
      const whatsappNormalized = data.whatsapp.replace(/\D/g, "");

      // 1. Login boutique et récupérer token + boutique id
      const response = await axios.post(
        `${backendUrl}/api/creerboutique/loginboutique`,
        {
          whatsapp: whatsappNormalized,
          motdepasse: data.motdepasse,
        }
      );

      if (response.data.success) {
        const token = response.data.token;
        const boutiqueId = response.data.id;

        // 2. Récupérer la boutique complète via API (pour avoir toutes les infos)
        const boutiqueResponse = await axios.get(
          `${backendUrl}/api/creerboutique/boutique/${boutiqueId}`
        );

        if (!boutiqueResponse.data.success) {
          throw new Error("Impossible de récupérer la boutique");
        }

        const boutiqueData = boutiqueResponse.data.boutique;

        // 3. Mise à jour du contexte + localStorage
        loginBoutique(token, boutiqueData);

        toast.success("Connexion réussie!", {
          position: "top-center",
          autoClose: 2000,
          onClose: () => navigate("/boutique"),
          bodyClassName: "text-3xl",
        });

        reset();
      } else {
        toast.error(response.data.message || "Erreur de connexion", {
          position: "top-center",
          bodyClassName: "text-xl",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      toast.error(
        error.response?.data?.message || error.message || "Erreur serveur",
        {
          position: "top-center",
          bodyClassName: "text-xl",
        }
      );
    }
  };

  return (
    <div className="w-full min-h-[80vh]">
      <Link to="/">
        <p className="text-5xl mb-6 font-bold text-gray-800 pt-10">Wazo.</p>
      </Link>

      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          <p className="text-center text-gray-600 mb-4">
            Connectez-vous pour gérer vos produits, vos commandes et suivre vos
            ventes.
          </p>
          <div className="border border-gray-100 rounded-lg p-6 shadow-2xl">
            <form onSubmit={handleSubmit(formSubmit)}>
              <p className="text-center text-gray-700 mb-8 text-lg">
                Se connecter à ma boutique Wazo
              </p>

              <div className="mb-8">
                <input
                  {...register("whatsapp")}
                  type="text"
                  placeholder="Votre numéro (ex: 0707070707)"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
                {errors.whatsapp && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.whatsapp.message}
                  </p>
                )}
              </div>

              <div className="mb-8">
                <input
                  {...register("motdepasse")}
                  type="password"
                  placeholder="Mot de passe"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
                {errors.motdepasse && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.motdepasse.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white p-3 rounded-lg mt-2 hover:bg-gray-800 transition-colors"
              >
                Connexion
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-6">
              Vous n'avez pas encore de boutique ?{" "}
              <span
                onClick={() => navigate("/creerboutique")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Créez-en une ici
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBoutique;

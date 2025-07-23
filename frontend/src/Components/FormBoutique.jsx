import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";

const schema = yup.object().shape({
  Nomdelaboutique: yup.string().required("Nom de la boutique obligatoire"),
  Description: yup
    .string()
    .required("Entrer une description de votre activité !"),
  Category: yup.string().required("Veuillez choisir une catégorie"),
  Adresse: yup.string().required("L'adresse est requise !"),
  Whatsapp: yup.string().required("Le numéro WhatsApp est requis."),
  motdepasse: yup.string().required("veuillez entrer un mot de passe"),
  Image: yup.mixed().required("L'image est requise."),
});

const FormBoutique = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const imageFile = watch("Image");

  const formSubmit = async (data) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const formData = new FormData();
      formData.append("name", data.Nomdelaboutique);
      formData.append("description", data.Description);
      formData.append("category", data.Category);
      formData.append("adresse", data.Adresse);
      formData.append("whatsapp", data.Whatsapp);
      formData.append("motdepasse", data.motdepasse);
      formData.append("image", data.Image[0]);

      const response = await axios.post(
        `${backendUrl}/api/creerboutique/create`,
        formData,
        { headers: { "content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.success("🎉 Boutique créée avec succès !", {
          onClose: () => navigate("/tableau"),
          bodyClassName: "text-3xl",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      reset();
    } catch (error) {
      toast.error(`❌ Erreur: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="max-w-lg mx-auto lg:mx-0 p-4 bg-white shadow rounded-2xl flex flex-col gap-8"
      >
        <h2 className="text-xl text-center font-bold">Infos de la boutique</h2>

        <div>
          <input
            {...register("Nomdelaboutique")}
            type="text"
            className="border p-2 rounded-xl w-full"
            placeholder="Nom de la boutique"
          />
          {errors.Nomdelaboutique && (
            <p className="text-red-500 text-sm">
              {errors.Nomdelaboutique.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            {...register("Description")}
            className="resize-none border p-2 rounded-xl w-full"
            rows={3}
            placeholder="Description de la boutique"
          />
          {errors.Description && (
            <p className="text-red-500 text-sm">{errors.Description.message}</p>
          )}
        </div>

        <div>
          <select
            {...register("Category")}
            className="border p-2 rounded-xl w-full"
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Fashion">Mode</option>
            <option value="Beauté">Beauté</option>
            <option value="Alimentation">Alimentation</option>
            <option value="Décoration">Décoration</option>
            <option value="Electronique">Electronique</option>
            <option value="Services">Services</option>
            <option value="Fitness">Fitness</option>
            <option value="Restauration">Restauration</option>
            <option value="Cosmetique">Cosmetique</option>
            <option value="Couture">Couture</option>
          </select>
          {errors.Category && (
            <p className="text-red-500 text-sm">{errors.Category.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("Adresse")}
            placeholder="Adresse (quartier, ville)"
            className="border p-2 rounded-xl w-full"
          />
          {errors.Adresse && (
            <p className="text-red-500 text-sm">{errors.Adresse.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("Whatsapp")}
            placeholder="Numéro business WhatsApp (+225XXXXXXXX)"
            className="border p-2 rounded-xl w-full"
          />
          {errors.Whatsapp && (
            <p className="text-red-500 text-sm">{errors.Whatsapp.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("motdepasse")}
            placeholder="creer votre mot de passe"
            className="border p-2 rounded-xl w-full"
          />
          {errors.motdepasse && (
            <p className="text-red-500 text-sm">{errors.motdepasse.message}</p>
          )}
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            {...register("Image")}
            className="border p-2 rounded-xl w-full"
          />
          {errors.Image && (
            <p className="text-red-500 text-sm">{errors.Image.message}</p>
          )}
          {imageFile && imageFile.length > 0 && (
            <img
              src={
                imageFile && imageFile[0]
                  ? URL.createObjectURL(imageFile[0])
                  : assets.uploadImage
              }
              alt="preview"
              className="w-32 h-32 object-cover rounded-xl mt-2"
            />
          )}
        </div>

        <button
          className="rounded-xl border p-2 bg-black text-white cursor-pointer"
          type="submit"
        >
          Creer ma boutique →
        </button>
      </form>

      <Link to="/loginboutique" className="px-4">
        <p className="text-2xl my-5">
          Avez-vous déjà un compte ?{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-500 font-medium cursor-pointer">
            Cliquez ici
          </span>
        </p>
      </Link>
    </div>
  );
};

export default FormBoutique;

import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const Add = () => {
  const { updateBoutiqueProducts, selectedBoutique, setBoutiques } =
    useContext(ShopContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    article: "",
    description: "",
    price: "",
    image: null,
    video: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleVideoChange = (e) => {
    setFormData({
      ...formData,
      video: e.target.files[0],
    });
  };

  console.log("Boutique sélectionnée pour ajout produit :", selectedBoutique);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.article ||
      !formData.description ||
      !formData.price ||
      !formData.image
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!selectedBoutique || !selectedBoutique._id) {
      toast.error("Aucune boutique sélectionnée");
      return;
    }

    const data = new FormData();
    data.append("boutiqueId", selectedBoutique._id);
    data.append("article", formData.article);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("image", formData.image);

    if (formData.video) {
      data.append("video", formData.video);
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${backendUrl}/api/product/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success("Produit ajouté avec succès !");
        await updateBoutiqueProducts(selectedBoutique, response.data.product);

        setBoutiques((prev) =>
          prev.map((b) =>
            b._id === response.data.boutique._id ? response.data.boutique : b
          )
        );

        setFormData({
          article: "",
          description: "",
          price: "",
          image: null,
          video: null,
        });
        document.getElementById("image").value = "";
        document.getElementById("video").value = "";
      } else {
        toast.error(response.data.message || "Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error(error.response?.data?.message || "Une erreur est survenue");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full flex-start w-full gap-3"
    >
      <div>
        <p className="mb-3 text-bold font-sans">
          Télécharger une image et une vidéo (optionnelle)
        </p>

        <div className="flex gap-4">
          <label htmlFor="image" className="cursor-pointer">
            <img
              className="w-24 h-24 object-cover rounded border"
              src={
                formData.image
                  ? URL.createObjectURL(formData.image)
                  : assets.uploadImage
              }
              alt="upload"
            />
            <p className="text-center text-sm">Image*</p>
            <input
              type="file"
              id="image"
              name="image"
              hidden
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>

          <label htmlFor="video" className="cursor-pointer">
            <img
              className="w-24 h-24 object-cover rounded border"
              src={formData.video ? assets.videoIcon : assets.uploadImage}
              alt="upload-video"
            />
            <p className="text-center text-sm">Vidéo</p>
            <input
              type="file"
              id="video"
              name="video"
              hidden
              accept="video/*"
              onChange={handleVideoChange}
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <label htmlFor="article" className="mb-2 block">
          Nom Article*
        </label>
        <input
          id="article"
          name="article"
          value={formData.article}
          onChange={handleChange}
          className="w-full border border-gray-400 outline-0 rounded-lg max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Nom produit"
          required
        />
      </div>

      <div className="w-full">
        <label htmlFor="description" className="mb-2 block">
          Description*
        </label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-400 outline-0 rounded-lg max-w-[500px] px-3 py-2"
          placeholder="Description produit"
          rows="3"
          required
        />
      </div>

      <div className="w-full">
        <label htmlFor="price" className="mb-2 block">
          Prix*
        </label>
        <input
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border border-gray-400 outline-0 rounded-lg max-w-[500px] px-3 py-2"
          type="number"
          placeholder="3000 FCFA"
          min="0"
          required
        />
      </div>

      <button
        className="w-28 py-3 cursor-pointer rounded-lg mt-4 bg-black text-white hover:bg-gray-800 transition"
        type="submit"
      >
        AJOUTER
      </button>
    </form>
  );
};

export default Add;

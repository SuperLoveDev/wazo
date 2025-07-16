import React from "react";
import { assets } from "../../assets/assets";
import { Video } from "lucide-react";

const Add = () => {
  return (
    <form className="flex flex-col h-full flex-start w-full gap-3">
      <div className="">
        <p className="mb-3 text-bold font-sans">
          Telecharger jusqu'a 5 produits et une Video
        </p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-23"
              loading="lazy"
              src={assets.uploadImage}
              alt="upload-image"
            />
            <p className="text-center text-sm">image</p>
            <input type="file" id="image1" hidden />
          </label>

          <label htmlFor="video">
            <img className="w-23" src={assets.uploadImage} alt="upload-image" />
            <p className="text-center text-sm">vidéo</p>
            <input type="file" accept="video/*" id="video" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Nom Article</p>
        <input
          className="w-full border border-gray-400 outline-0 rounded-lg max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Nom produit"
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Prix Article</p>
        <input
          className="w-full border border-gray-400 outline-0 rounded-lg max-w-[500px] px-3 py-2"
          type="text"
          placeholder="3000 FCFA"
        />
      </div>

      <button
        className="w-28 py-3 cursor-pointer rounded-lg mt-4 bg-black text-white"
        type="submit"
      >
        AJOUTER
      </button>
    </form>
  );
};

export default Add;

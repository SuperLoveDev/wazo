import React from "react";
import FormBoutique from "../Components/FormBoutique";
import imageform from "../assets/registerImage.jpg";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateShop = ({ handleSubmit }) => {
  const navigate = useNavigate();

  return (
    <>
      <div onClick={() => navigate(-1)} className="pt-10 cursor-pointer">
        <ArrowLeft />
      </div>

      <div className="py-8">
        <p className="text-4xl text-center font-bold text-gray-600 mt-1">
          Lancez votre boutique en ligne en moins de 2 minutes – rapide, simple
          et gratuit.
        </p>
      </div>

      <div className="max-w-[1200px] w-full mx-auto flex flex-col lg:flex-row gap-4 p-4 ">
        <div className="w-full lg:max-w-lg flex-1">
          <FormBoutique onSubmit={handleSubmit} />
        </div>
        <div className="w-full flex-1 rounded-2xl">
          <img
            src={imageform}
            className="w-full rounded-2xl h-full object-cover max-w-[1000px] sticky"
            alt="Créer sa boutique sur Wazo"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default CreateShop;

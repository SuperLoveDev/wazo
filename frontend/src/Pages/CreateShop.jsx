import React from "react";
import FormBoutique from "../Components/FormBoutique";
import imageform from "../assets/registerImage.jpg";

const CreateShop = ({ handleSubmit }) => {
  return (
    <div className="w-full min-h-[600px] py-8 flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col lg:flex-row gap-4 p-4 ">
        <div className="w-full lg:max-w-lg flex-1">
          <FormBoutique onSubmit={handleSubmit} />
        </div>
        <div className="flex-1 rounded-2xl">
          <img
            src={imageform}
            className="w-full rounded-2xl h-full object-cover max-w-[530px] sticky"
            alt="Créer sa boutique sur Wazo"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateShop;

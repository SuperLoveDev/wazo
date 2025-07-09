import React from "react";

const Card = ({ image, gallery, name, description, phone, location }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow hover:shadow-xl p-4 max-w-xs w-96 h-auto hover:scale-105 transition-transform">
      <img
        className="w-full h-48 object-cover rounded-xl"
        src={image}
        alt={name}
      />

      {/* GALLERY IMAGES */}
      {gallery && (
        <div className="flex gap-3 mt-3 overflow-x-auto">
          {gallery.map((img, index) => {
            return (
              <img
                key={index}
                src={img}
                className="w-22 h-22 object-cover rounded hover:scale-120 transform ease-in-out duration-300 cursor-pointer"
                alt={`preview ${index + 1}`}
              />
            );
          })}
        </div>
      )}

      <div className="flex flex-col items-center mt-4 px-2 gap-2">
        <p className="text-lg font-semibold">Name: {name}</p>
        <p className="text-sm text-gray-600">Service: {description}</p>
        <p className="text-sm text-gray-500">Phone: {phone}</p>
        <p className="text-sm text-gray-500">Location: {location}</p>
      </div>
      <button className="mt-4 w-full bg-amber-800 hover:bg-amber-700 transition-colors h-12 text-white rounded-xl font-semibold cursor-pointer">
        See Catalog
      </button>
    </div>
  );
};

export default Card;

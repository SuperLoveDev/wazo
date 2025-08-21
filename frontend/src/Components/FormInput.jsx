import React from "react";

const FormInput = ({ name, placeholder, register, error, type = "text" }) => (
  <div className="w-full">
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className="border border-gray-300 text-sm rounded py-1.5 px-3.5 w-full outline-none"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default FormInput;

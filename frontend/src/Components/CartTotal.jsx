import React from "react";
import Title from "./Title";

const CartTotal = () => {
  return (
    <div className="w-full">
      <div className="px-3 text-xl mt-5 mb-7">
        <Title text1={"Total"} text2={"Panier"} />
      </div>

      <div className="px-3 flex flex-col gap-2 mt-2 mb-3 text-sm">
        <div className="flex justify-between">
          <p className="text-base">Subtotal</p>
          <p>prix</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p className="flex flex-col text-base">
            Livraison <span>Forfait</span>
          </p>
          <p>prix</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b className="text-base">Total</b>
          <b>prix</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

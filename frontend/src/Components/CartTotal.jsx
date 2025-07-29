import React, { useContext } from "react";
import Title from "./Title";
import { CartContext } from "../Context/CartContext";

const CartTotal = () => {
  const { cartItems } = useContext(CartContext);

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.prix * item.quantity;
  }, 0);

  const livraison = 1500;

  const total = subtotal + livraison;

  return (
    <div className="w-full">
      <div className="px-3 text-xl mt-5 mb-7">
        <Title text1={"Total"} text2={"Panier"} />
      </div>

      <div className="px-3 flex flex-col gap-2 mt-2 mb-3 text-sm">
        <div className="flex justify-between">
          <p className="text-base">Sous-total</p>
          <p>{subtotal.toLocaleString()} FCFA</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p className="flex flex-col text-base">
            Livraison <span className="text-xs text-gray-500">Forfait</span>
          </p>
          <p>{livraison.toLocaleString()} FCFA</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b className="text-base">Total</b>
          <b>{total.toLocaleString()} FCFA</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

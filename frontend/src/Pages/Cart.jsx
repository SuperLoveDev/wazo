import React, { useContext } from "react";
import Title from "../Components/Title";
import { ArrowLeft, Trash2Icon } from "lucide-react";
import CartTotal from "../Components/CartTotal";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, deletCart, updateCart } = useContext(CartContext);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return; // éviter quantité < 1
    updateCart(productId, newQuantity);
  };

  return (
    <>
      <div className="">
        <div
          className="flex gap-4 items-center cursor-pointer font-sans font-bold"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={30} />
          <p className="text-2xl">Retour</p>
        </div>

        <div className="py-10 flex gap-1 items-center">
          <Title text1={"MON"} text2={"PANIER"} />
        </div>

        {cartItems.length === 0 ? (
          <p>Votre panier est vide</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productId}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 "
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={item.image}
                  alt={item.article}
                />
                <div className="">
                  <p>{item.article}</p>
                  <p>{item.prix} FCFA</p>
                </div>
              </div>
              <input
                className="border max-w-10 sm:max-w-15 px-1 sm:px-2 py-1 outline-0"
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.productId, parseInt(e.target.value))
                }
              />
              <Trash2Icon
                className="w-4 sm:w-5 mr-4 cursor-pointer"
                onClick={() => deletCart(item.productId)}
              />
            </div>
          ))
        )}

        <div className="flex justify-start my-20">
          <div className="px-2 border w-full sm:max-w-[450px]">
            <CartTotal />
            <div
              onClick={() => navigate("/commande")}
              className="w-full flex items-center justify-center border bg-black text-white p-4 rounded mb-5 mt-7 cursor-pointer"
            >
              <button className="cursor-pointer">Je finalise</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

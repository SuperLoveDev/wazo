import React from "react";
import ShopContextProvider from "./ShopContext";
import CartContextProvider from "./CartContext";

const ContextProviderWrapper = ({ children }) => {
  return (
    <ShopContextProvider>
      <CartContextProvider>{children}</CartContextProvider>
    </ShopContextProvider>
  );
};

export default ContextProviderWrapper;

import { createContext } from "react";
import { shops } from "../assets/assets";

export const ShopContext = createContext(shops);

const ShopContextProvider = ({ children }) => {
  const value = { shops };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;

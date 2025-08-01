import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./Context/ShopContext.jsx";
import ContextProviderWrapper from "./Context/ContextProviderWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProviderWrapper>
        <App />
      </ContextProviderWrapper>
    </BrowserRouter>
  </StrictMode>
);

import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Catalog from "./Pages/Catalog";
import CreateShop from "./Pages/CreateShop";
import About from "./Pages/TabDeBord";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer";
import TabDeBord from "./Pages/TabDeBord";
import CatalogDetails from "./Components/CatalogDetails";

function App() {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalog />} />
          <Route path="/catalogue/:id" element={<CatalogDetails />} />
          <Route path="/createboutique" element={<CreateShop />} />
          <Route path="/tableaubord" element={<TabDeBord />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

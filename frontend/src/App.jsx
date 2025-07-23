import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Catalog from "./Pages/Catalog";
import CreateShop from "./Pages/CreateShop";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer";
import Tableau from "./Pages/Dashboard/Tableau";
import CatalogDetails from "./Components/CatalogDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import List from "./Pages/Dashboard/List";
import Add from "./Pages/Dashboard/Add";
import Order from "./Pages/Dashboard/Order";
import Statistic from "./Pages/Dashboard/Statistic";
import Setting from "./Pages/Dashboard/Setting";
import Client from "./Pages/Client";
import LoginBoutique from "./Pages/LoginBoutique";
import BoutiqueOwner from "./Components/BoutiqueOwner";

function App() {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/client" element={<Client />} />
          <Route path="/catalogue" element={<Catalog />} />
          <Route path="/catalogue/:id" element={<CatalogDetails />} />
          <Route path="/creerboutique" element={<CreateShop />} />
          <Route path="/boutique" element={<BoutiqueOwner />} />
          <Route path="/tableau" element={<Tableau />}>
            <Route path="list" element={<List />} />
            <Route path="add" element={<Add />} />
            <Route path="order" element={<Order />} />
            <Route path="stats" element={<Statistic />} />
            <Route path="setting" element={<Setting />} />
          </Route>
          <Route path="loginboutique" element={<LoginBoutique />} />

          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-center"
          bodyClassName="text-3xl font-semibold"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
      </div>
    </>
  );
}

export default App;

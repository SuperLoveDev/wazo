import React from "react";

import BoutiqueCard from "../Components/BoutiqueCard";
import Hero from "../Components/Hero";
import SectorCard from "../Components/SectorCard";
import Notice from "../Components/Notice";
import Boost from "../Components/Boost";
import Priority from "../Components/Priority";

const Home = () => {
  return (
    <>
      <Hero />
      <Notice />
      <Boost />
      <Priority />
    </>
  );
};

export default Home;

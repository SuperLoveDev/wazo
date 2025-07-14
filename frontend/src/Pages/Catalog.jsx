import React from "react";
import HeroCatalog from "../Components/HeroCatalog";
import BoutiqueCard from "../Components/BoutiqueCard";
import { useParams } from "react-router-dom";

const Catalog = () => {
  const { id } = useParams();

  return (
    <>
      <HeroCatalog />
      <BoutiqueCard boutiqueId={id} />
    </>
  );
};

export default Catalog;

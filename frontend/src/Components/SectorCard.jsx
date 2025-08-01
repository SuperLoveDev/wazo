import React from "react";
import { sectorImages } from "../assets/sectors";
import Title from "./Title";
import { motion } from "framer-motion";
import { confiances } from "../assets/assets";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// sector data for mapping sector-card
const sectorsData = [
  { name: "Fashion", image: sectorImages.fashion, slug: "fashion" },
  { name: "Beauté", image: sectorImages.beaute, slug: "beaute" },
  { name: "Couture", image: sectorImages.couture, slug: "couture" },
  { name: "Audio-visuel", image: sectorImages.audio, slug: "audio-visuel" },
  { name: "Restaurant", image: sectorImages.resto, slug: "resto" },
  { name: "Service", image: sectorImages.service, slug: "service" },
  { name: "Éducation", image: sectorImages.education, slug: "education" },
  { name: "Location", image: sectorImages.location, slug: "location" },
  { name: "Fitness", image: sectorImages.fitness, slug: "fitness" },
];

const confianceImg = [
  { image: confiances.orange },
  { image: confiances.mtn },
  { image: confiances.moov },
  { image: confiances.ltv },
  { image: confiances.bad },
  { image: confiances.hitrust },
  { image: confiances.iso },
  { image: confiances.captera },
];

const SectorCard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="pb-10">
        <Title text1={"POUR LES"} text2={"PROFESSIONELS"} />
        <div
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/creerboutique");
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 gap-y-8 mt-8"
        >
          {/* CARD MAPPING */}
          {sectorsData.map((sector, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative w-full lg:max-w-[400px] xl:max-w-[450px] 2xl:max-w-[500px] h-80 rounded-2xl overflow-hidden shadow-sm cursor-pointer group mx-auto"
            >
              <img
                src={sector.image}
                alt={sector.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-2xl group-hover:bg-black/20 transition duration-300"></div>
              <p className="absolute bottom-3 left-4 z-10 text-white font-semibold text-xl">
                {sector.name}
              </p>
              <ArrowRight
                size={20}
                className="h-8 w-8 p-1 absolute bottom-3 right-4 bg-white border border-white rounded-full group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-8 gap-4 py-8 items-center mx-4">
        {confianceImg.map((img, index) => {
          return (
            <img
              key={index}
              src={img.image}
              loading="lazy"
              className="max-h-[50px] w-auto h-auto md:max-h-[72px]"
              alt=""
            />
          );
        })}
      </div>
    </>
  );
};

export default SectorCard;

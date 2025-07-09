import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import Card from "./Card";
import { ShopContext } from "../Context/ShopContext";

const ProductCard = () => {
  const { shops } = useContext(ShopContext);
  const [boutiques, setBoutiques] = useState([]);

  useEffect(() => {
    setBoutiques(shops);
  }, [shops]);

  return (
    <div className="font-bold font-sans text-center my-20">
      <Title text1={"BEST"} text2={"BOUTIQUES"} />

      <p className="text-center my-5 text-sm mb-4 mx-auto text-gray-600">
        Discover and support the best local boutiques in your area. Shop from
        beauty, fashion, food, barber, services and more, directly through Wazo.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mt-20 px-4">
        {boutiques.map((item, index) => {
          return (
            <Card
              key={item.id}
              index={index}
              image={item.image}
              gallery={item.gallery}
              name={item.name}
              description={item.description}
              phone={item.phone}
              location={item.location}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductCard;

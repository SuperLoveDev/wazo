import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center justify-center mt-0">
      <p className="text-black text-3xl font-bold font-sans">
        {text1} <span className="text-gray-900 font-bold">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[2px] sm:h-[2px] ml-2 bg-gray-950 border-2 rounded-xl"></p>
    </div>
  );
};

export default Title;

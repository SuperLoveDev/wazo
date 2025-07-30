import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center justify-center mt-0">
      <p className="text-gray-700 text-3xl font-bold font-sans">
        {text1} <span className="text-gray-700 font-bold">{text2}</span>
      </p>
      -
    </div>
  );
};

export default Title;

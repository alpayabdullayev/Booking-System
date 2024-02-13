import React from "react";

const SectionTitle = ({ children, text }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 text-center  ">
      <h1 className="[font-size:_clamp(1em,2vw,5em)] font-bold">{children}</h1>
      <p className="text-gray-600 w-full  md:w-7/12">{text}</p>
    </div>
  );
};

export default SectionTitle;

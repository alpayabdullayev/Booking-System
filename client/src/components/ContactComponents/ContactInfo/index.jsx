import React from "react";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { GrInfo } from "react-icons/gr";

const ContactInfo = () => {
  return (
    <div className="flex justify-center  w-full gap-2 flex-col text-left place-items-start  ">
      <div className="mb-8">
        <h1 className="text-5xl text-main-purple font-semibold mb-4">
          Contact information
        </h1>
        <div className="w-16 h-1  bg-blue-600 mb-4"></div>
      </div>
      <p className="w-full md:w-8/12 mb-4   flex items-center gap-4">
        {" "}
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
      <p className="mb-2 flex items-center gap-4">
        {" "}
        <span className="text-3xl text-blue-500">
          <FaLocationDot />
        </span>{" "}
        540 Libety Road, New District, New York
      </p>
      <p className="mb-2 flex items-center gap-4">
        {" "}
        <span className="text-3xl text-blue-500">
          <FaPhone />
        </span>{" "}
        (000) 999 -656 -888
      </p>
      <p className="mb-2 flex items-center gap-4">
        {" "}
        <span className="text-3xl text-blue-500">
          <MdOutlineMail />
        </span>{" "}
        travelerwp@gmail.com
      </p>
    </div>
  );
};

export default ContactInfo;

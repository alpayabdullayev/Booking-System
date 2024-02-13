import React from "react";
import { FaBed, FaCar } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { FaTaxi } from "react-icons/fa";
import SearchComponents from "../common/Search";

const Header = () => {
  return (
    <>
      <div className=" py-10 bg-[url('https://modtour.travelerwp.com/wp-content/uploads/2022/04/Banner.png')] bg-center bg-cover bg-no-repeat min-h-[70vh]   pb-10">
        <div className="wrapper">
          <ul className="text-white  flex flex-wrap gap-8 items-center min-h-[60px]">
            <li className="flex hover:text-blue-800  border rounded-full p-2    duration-300 items-center gap-2 text-xl cursor-pointer">
              <span>
                <FaBed />
              </span>
              Stays
            </li>
            <li className="flex hover:text-blue-800 duration-300 items-center gap-2 text-xl cursor-pointer">
              <span>
                <MdFlight />
              </span>
              Flights
            </li>
            <li className="flex hover:text-blue-800 duration-300 items-center gap-2 text-xl cursor-pointer">
              <span>
                <FaCar />
              </span>
              Car rentals
            </li>
          </ul>
          <div className="py-5 text-white">
            <h1 className="[font-size:_clamp(2em,2vw,10em)] text-white font-bold ">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="w-8/12">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account Sign in / Register
            </p>
          </div>
          <SearchComponents />
        </div>
      </div>
    </>
  );
};

export default Header;

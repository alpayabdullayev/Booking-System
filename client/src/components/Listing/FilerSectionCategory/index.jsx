import React from "react";
import { Checkbox } from "antd";
import { useContext } from "react";
import { FaStar } from "react-icons/fa";

const FilterSectionHotelStars = ({ hotelStars, handlehotelStarsChange }) => {
  return (
    <>
      <div className="filterSectionHotelStars">
        <div className=" w-full ">
          <div className="">
            <div className="">
              <Checkbox
                className="w-full md:w-auto"
                onChange={(e) => handlehotelStarsChange(e)}
                value={1}
                checked={hotelStars.includes(1)}
              >
                <span className=" text-yellow-500">
                  {" "}
                  <FaStar />
                </span>
              </Checkbox>
            </div>
          </div>
          <div className="">
            <div className="">
              <Checkbox
                onChange={(e) => handlehotelStarsChange(e)}
                value={2}
                checked={hotelStars.includes(2)}
                className="w-full md:w-auto"
              >
                <span className=" flex items-center gap-1 text-yellow-500">
                  {" "}
                  <FaStar /> <FaStar />
                </span>
              </Checkbox>
            </div>
          </div>
          <div className="">
            <div className="">
              <Checkbox
                onChange={(e) => handlehotelStarsChange(e)}
                value={3}
                checked={hotelStars.includes(3)}
                className="w-full md:w-auto"
              >
                <span className=" flex items-center gap-1 text-yellow-500">
                  {" "}
                  <FaStar /> <FaStar /> <FaStar />
                </span>
              </Checkbox>
            </div>
          </div>
          <div className="">
            <div className="">
              <Checkbox
                onChange={(e) => handlehotelStarsChange(e)}
                value={4}
                checked={hotelStars.includes(4)}
                className="w-full md:w-auto"
              >
                <span className=" flex items-center gap-1 text-yellow-500">
                  {" "}
                  <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </span>
              </Checkbox>
            </div>
          </div>
          <div className="">
            <div className="">
              <Checkbox
                onChange={(e) => handlehotelStarsChange(e)}
                value={5}
                checked={hotelStars.includes(5)}
                className="w-full md:w-auto"
              >
                <span className=" flex items-center gap-1 text-yellow-500">
                  {" "}
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </span>
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSectionHotelStars;

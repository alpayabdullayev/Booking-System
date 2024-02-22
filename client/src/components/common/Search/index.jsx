import React, { useContext, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { FaBed, FaCalendar, FaPersonBooth } from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchContext } from "../../../context/SearchContext";

const SearchComponents = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
    console.log({ state: { destination, dates, options } });
  };

  return (
    <div className="flex flex-col flex-wrap  gap-4">
      <div className="relative ">
        <span className="absolute top-3 left-4 text-gray-600 bg-white ">
          <FaBed />
        </span>
        <input
          type="text"
          placeholder="Where are you going?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="pl-[68px]  py-2 outline-none text-gray-600 rounded-sm bg-white"
        />
      </div>

      <div className="relative z-40 flex flex-wrap">
        <span className="text-gray-600 px-2 bg-white  absolute top-1 left-0   z-10">
          <FaCalendar />
        </span>
        <div className="relative ">
          <span
            onClick={() => setOpenDate(!openDate)}
            className="relative bg-white   text-gray-600 cursor-pointer rounded-sm  p-[9px] px-8 "
          >
            {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
              dates[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </span>
          {openDate && (
            <span className="absolute  top-10 left-0">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
              />
            </span>
          )}
        </div>
      </div>
      {/* <div className="relative  w-52 flex flex-wrap flex-col">
        <span
          onClick={() => setOpenOptions(!openOptions)}
          className=" bg-white cursor-pointer p-[8px] rounded-sm"
        >{`${options.adult} Travellers · ${options.room} Room`}</span>
        <span className="bg-white ">
          {openOptions && (
            <div className="  rounded-sm cursor-pointer absolute  px-4 py-2 left-0 right-0 top-12 bg-white text-black">
              <div className="flex  justify-between  items-center">
                <span className="">Travellers</span>
                <div className="">
                  <button
                    disabled={options.adult <= 1}
                    className="p-1  px-1.5 bg-black text-white rounded-sm"
                    onClick={() => handleOption("adult", "d")}
                  >
                    -
                  </button>
                  <span className="">{options.adult}</span>
                  <button
                    className="px-1 py-1 bg-black text-white rounded-sm"
                    onClick={() => handleOption("adult", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex  py-2 justify-between items-center">
                <span className="">Room</span>
                <div className="">
                  <button
                    disabled={options.room <= 1}
                    className="p-1  px-1.5 bg-black text-white rounded-sm"
                    onClick={() => handleOption("room", "d")}
                  >
                    -
                  </button>
                  <span className="">{options.room}</span>
                  <button
                    className="px-1 py-1 bg-black text-white rounded-sm"
                    onClick={() => handleOption("room", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </span>
      </div> */}
      <div className="">
        <button
          className="py-2 px-4 bg-blue-500  hover:bg-black duration-300       rounded-md text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchComponents;

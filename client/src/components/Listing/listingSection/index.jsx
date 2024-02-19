import MainCard from "@/components/common/mainCard";
import MainCardSkeleton from "@/components/common/mainCardSkeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterSectionHotelStars from "../FilerSectionCategory";
import { Slider } from "antd";

const ListingSection = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setsearch] = useState("");
  const [hotelStars, sethotelStars] = useState([]);
  const [priceRange, setPriceRange] = useState([400, 900]);

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  async function getAll() {
    try {
      const res = await axios.get("http://localhost:8000/api/hotels");
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  const handlehotelStarsChange = (e) => {
    const clickedhotelStars = e.target.value;
    const isSelectedhotelStars = hotelStars.includes(clickedhotelStars);

    if (isSelectedhotelStars) {
      sethotelStars(
        hotelStars.filter((hotelStars) => hotelStars !== clickedhotelStars)
      );
    } else {
      sethotelStars([...hotelStars, clickedhotelStars]);
    }
  };

  function handleHotelSearch(e) {
    setsearch(e.target.value);
  }
  return (
    <>
      <section className="py-10">
        <div className="wrapper">
          <div className="py-10">
            <div className="grid grid-cols-12   gap-10">
              <div className=" col-span-12 flex flex-col gap-5 lg:col-span-3">
                <div>
                  <input
                    className=" border outline-none  border-black w-full rounded-lg px-2 py-2 "
                    type="text"
                    value={search}
                    onChange={(e) => handleHotelSearch(e)}
                    placeholder="Search..."
                  />
                </div>
                <Accordion className=" ">
                  <div className=" bg-gray-50  border-none">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className=" "
                    >
                      <p className=" text-lg font-bold"> Price Range:</p>
                    </AccordionSummary>
                  </div>
                  <AccordionDetails className=" bg-gray-50  border-none">
                    <span>
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                    <Slider
                      range
                      draggableTrack
                      defaultValue={priceRange}
                      min={0}
                      max={1100}
                      step={1}
                      onAfterChange={handlePriceChange}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion className=" ">
                  <div className=" bg-gray-50  border-none">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className=" "
                    >
                      <p className=" text-lg font-bold"> Hotel Stars</p>
                    </AccordionSummary>
                  </div>
                  <AccordionDetails className=" bg-gray-50  border-none">
                    <FilterSectionHotelStars
                      hotelStars={hotelStars}
                      handlehotelStarsChange={handlehotelStarsChange}
                    />
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className=" col-span-12 flex flex-col gap-10 lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
                  {isLoading ? (
                    <>
                      <MainCardSkeleton />
                      <MainCardSkeleton />
                      <MainCardSkeleton />
                    </>
                  ) : (
                    data &&
                    data
                      .filter((item) =>
                        item.name
                          .toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase())
                      )
                      .filter((item) => {
                        if (hotelStars.length === 0) {
                          return true;
                        }
                        return hotelStars.includes(item.hotelStars);
                      })
                      .filter((item) => {
                        const itemPrice = parseInt(item.cheapestPrice, 10);
                        return (
                          itemPrice >= priceRange[0] &&
                          itemPrice <= priceRange[1]
                        );
                      })
                      .map((item, index) => (
                        <MainCard key={index} item={item} />
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListingSection;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// import "./index.css";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";

// // import required modules
// import { Autoplay, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { CiHeart, CiLocationOn, CiPlay1, CiShare2 } from "react-icons/ci";
import { IoFootstepsOutline } from "react-icons/io5";
import { MdLocationCity, MdOutlineGTranslate } from "react-icons/md";
import { VscVerifiedFilled } from "react-icons/vsc";
import { TbTag } from "react-icons/tb";
import Featured from "../HomePage/featured";
import { RiPinDistanceLine } from "react-icons/ri";
import axios from "axios";
import { SearchContext } from "@/context/SearchContext";
import SearchComponents from "../common/Search";
import HotelDetailSlider from "./hotelDetailSlider";
import HotelDetailSliderSection from "./hotelDetailSliderSection";

export const HotelDetailSection = () => {
  // const breakpoints = {
  //   968: {
  //     spaceBetween: 30,
  //     slidesPerView: 2,
  //   },
  //   640: {
  //     spaceBetween: 20,
  //     slidesPerView: 1,
  //   },
  //   0: {
  //     spaceBetween: 20,
  //     slidesPerView: 1,
  //   },
  // };
  const { id } = useParams();

  const [data, setdata] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(1);
  const [roomCount, setRoomCount] = useState(1);

  async function getAll() {
    try {
      const res = await axios.get(`http://localhost:8000/api/find/${id}`);
      setdata(res.data);
      console.log(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAll();
  }, [id]);

  const { dates, options } = useContext(SearchContext);

  useEffect(() => {
    if (dates && dates.length > 0) {
      const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
      const timeDiff = Math.abs(
        dates[0].endDate.getTime() - dates[0].startDate.getTime()
      );
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      setDays(diffDays);
    }
  }, [dates]);

  useEffect(() => {
    if (options && options.room) {
      setRoomCount(options.room);
    }
  }, [options]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const updateRoomCount = (count) => {
    setRoomCount(count);
  };

  // Function to update selected dates
  const updateSelectedDates = (startDate, endDate) => {
    setSelectedDates({ startDate, endDate });
  };

  return (
    <>
      <HotelDetailSliderSection data={data} />
      {IsLoading ? (
        <p>Loading....</p>
      ) : (
        data && (
          <>
            <section className="py-10">
              <div className=" wrapper">
                <div className="flex justify-between flex-wrap items-center">
                  <div>
                    <h1 className="[font-size:_clamp(1em,2vw,5em)] font-bold">
                      {data.name}
                    </h1>
                    <p className="flex flex-wrap items-center gap-3">
                      <span className=" text-yellow-500">
                        <FaStar />
                      </span>
                      <span className=" font-bold  flex-wrap flex gap-1">
                        5
                        <span className=" font-normal text-base text-gray-600">
                          (2 Reviews) - {data.address}
                        </span>
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10   text-lg rounded-full  shadow-md border flex  justify-center items-center">
                      <span className=" ">
                        <CiPlay1 />
                      </span>
                    </div>
                    <div className="w-10 h-10   text-lg rounded-full  shadow-md border flex  justify-center items-center">
                      <span className=" ">
                        <CiShare2 />
                      </span>
                    </div>
                    <div className="w-10 h-10   text-lg rounded-full  shadow-md border flex  justify-center items-center">
                      <span className=" ">
                        <CiHeart />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )
      )}
      {IsLoading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <section className="py-10">
            <div className="wrapper">
              <div className="grid grid-cols-12   gap-10">
                <div className=" col-span-12 flex flex-col gap-10 lg:col-span-8">
                  <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12    rounded-xl text-2xl   border-gray-400 border flex  justify-center items-center">
                        <span className=" ">
                          <RiPinDistanceLine />
                        </span>
                      </div>
                      <div>
                        <h1 className=" font-bold">Distance</h1>
                        <p>{data.distance}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12    rounded-xl text-2xl   border-gray-400 border flex  justify-center items-center">
                        <span className=" ">
                          <IoFootstepsOutline />
                        </span>
                      </div>
                      <div>
                        <h1 className=" font-bold">Type</h1>
                        <p className=" capitalize">
                          {data.type.map((type) => type.name)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12    rounded-xl text-2xl   border-gray-400 border flex  justify-center items-center">
                        <span className=" ">
                          <MdLocationCity />
                        </span>
                      </div>
                      <div>
                        <h1 className=" font-bold">City</h1>
                        <p className=" capitalize">{data.city}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12    rounded-xl text-2xl   border-gray-400 border flex  justify-center items-center">
                        <span className=" ">
                          <MdOutlineGTranslate />
                        </span>
                      </div>
                      <div>
                        <h1 className=" font-bold">Languages</h1>
                        <p>{data.languages.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full min-h-[1px] bg-gray-300"></div>
                  <div className="">
                    <div>
                      <h1 className=" font-bold text-2xl">About this Hotel</h1>
                      <p className="flex flex-col gap-4 py-5">
                        <span>
                          {" "}
                          The company continued to work at its regular pace. In
                          1972, the P250 Urraco, the 400 GT Jarama, the 400 GT
                          Espada and the P400 Miura SV were in full production.
                          That year, in an attempt to improve sales that were
                          frankly quite disappointing until then, the Jarama
                          hand a 365-hp engine and was dubbed the Jarama S.{" "}
                        </span>
                        <span>
                          {" "}
                          In 1972, the Urraco, which had experienced several
                          initial slowdowns, was finally put into production.
                          Almost inevitably, the S version also arrived in
                          October of that year. In this case, the goal was not
                          to enhance the car’s performance but to improve its
                          overall quality, which had been neglected in the haste
                          to start production.
                        </span>
                        <span>
                          {" "}
                          The following year, while waiting for the Countach
                          prototype to be developed to a stage that would enable
                          its production, the Espada was further modified and
                          perfected, and the new series was presented in October
                          1972. New wheels as well as perfected detailing of the
                          entire body, the dashboard, the central instrument
                          panel and various components characterised this
                          well-made Series III. This last series essentially
                          represented the decisive peak in the evolution of this
                          outstanding four-seater, which is still in great
                          demand among Lamborghini fans around the world. Its
                          production would reach the respectable figure of 1226
                          units, quite a large number for a carmaker of this
                          size selling at top-level list prices.
                        </span>
                        <span>
                          The production model of the Countach was codenamed LP
                          400 because its V12 – positioned longitudinally behind
                          the cockpit – was increased to an ideal displacement
                          of 4 litres (3929 cc). This model debuted at the 1973
                          Geneva Motor Show.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className=" border-b">
                    <h1 className="font-bold text-2xl">Highlights</h1>
                    <ul className="py-5 flex flex-col gap-4 justify-center flex-wrap">
                      <li className="flex items-center gap-3  text-gray-500">
                        <span className=" text-green-300 text-2xl font-bold">
                          <VscVerifiedFilled />
                        </span>
                        Visit eight villages showcasing Polynesian culture
                      </li>
                      <li className="flex items-center gap-3  text-gray-500">
                        <span className=" text-green-300 text-2xl font-bold">
                          <VscVerifiedFilled />
                        </span>
                        Canoe ride, tattoos, spear throwing, ukulele lessons and
                        fishing
                      </li>
                      <li className="flex items-center gap-3  text-gray-500">
                        <span className=" text-green-300 text-2xl font-bold">
                          <VscVerifiedFilled />
                        </span>
                        Spectacular Polynesian evening dinner show ‘Ha: Breath
                        of Life’
                      </li>
                      <li className="flex items-center gap-3  text-gray-500">
                        <span className=" text-green-300 text-2xl font-bold">
                          <VscVerifiedFilled />
                        </span>
                        Optional transportation from Waikiki hotels
                      </li>
                    </ul>
                  </div>
                  <div className="border-b py-5">
                    <h1 className="font-bold text-2xl">Languages</h1>
                    <ul className="pb-5  py-5   flex  flex-wrap gap-10">
                      <li className="flex flex-wrap items-center gap-3 text-xl text-gray-500 ">
                        <span>
                          <TbTag />
                        </span>
                        <span className="text-base">Espanol</span>
                      </li>
                      <li className="flex flex-wrap items-center gap-3 text-xl text-gray-500 ">
                        <span>
                          <TbTag />
                        </span>
                        <span className="text-base">Francais</span>
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <div className="flex flex-wrap justify-between items-center">
                      <h1 className="font-bold text-2xl">Hotel's Location</h1>
                      <p className="flex items-center gap-1  text-gray-500 capitalize">
                        <CiLocationOn />
                        New York, USA
                      </p>
                    </div>
                    <div>
                      {data && (
                        <div>
                          <div
                            dangerouslySetInnerHTML={{ __html: data.mapAdress }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h1 className="font-bold text-2xl pb-5">Reviews</h1>
                    <div className=" py-10 w-1/2 rounded-lg bg-gray-50  border flex flex-col justify-center items-center">
                      <h1 className=" text-blue-500 [font-size:_clamp(1em,2vw,5em)] font-bold flex gap-3 items-center">
                        <span className=" text-yellow-500">
                          <FaStar />
                        </span>{" "}
                        5/5
                      </h1>
                      <p className="text-center text-xl font-bold">Excellent</p>
                      <p className=" text-gray-600">(2 Reviews)</p>
                    </div>
                  </div>
                </div>
                <div className="  col-span-12 lg:col-span-4">slam</div>
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts"></div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${days * data.cheapestPrice * roomCount}</b> ({days}{" "}
                    nights)
                  </h2>
                  {/* <button onClick={() => updateRoomCount(roomCount + 1)}>
                    Increase Room Count
                  </button> */}

                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
          </section>
        )
      )}
      <Featured />;
    </>
  );
};

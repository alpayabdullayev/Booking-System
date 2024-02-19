import MainCardSkeleton from "@/components/common/mainCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaClock, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Featured = () => {
  const [data, setdata] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  async function getAll() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/hotels?featured=true"
      );
      setdata(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAll();
  }, []);
  return (
    <>
      <section className="py-20">
        <div className="wrapper">
          <div className="text-left [font-size:_clamp(1em,2vw,5em)] font-bold">
            <h1>Recommended for you</h1>
          </div>
          <div className="py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ">
              {IsLoading ? (
                <>
                  <MainCardSkeleton />
                  <MainCardSkeleton />
                  <MainCardSkeleton />
                  <MainCardSkeleton />
                </>
              ) : (
                data &&
                data.map((item) => (
                  <div className=" group  rounded-xl shadow-md" key={item._id}>
                    <div className=" relative overflow-hidden   rounded-t-xl">
                      <Link to={`/hotelDetail/${item._id}`}>
                        <img
                          src={item.mainImage}
                          alt=""
                          className="w-full  group-hover:scale-105 duration-300  h-52 object-cover"
                        />
                      </Link>

                      <div className=" absolute top-2 left-2">
                        {item.featured === true ? (
                          <p className=" p-1 bg-red-600 text-white font-bold rounded-md">
                            Featured
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                      <p className="flex items-center gap-1  capitalize">
                        <CiLocationOn /> {item.city}
                      </p>
                      <h1 className=" text-xl font-bold group-hover:text-blue-800 duration-200  ">
                        {item.name}
                      </h1>
                      <p className="flex items-center  gap-2">
                        <span className=" text-yellow-500">
                          <FaStar />
                        </span>
                        <span className=" font-bold">
                          5 <span className=" font-normal">(4)</span>
                        </span>
                      </p>
                      <div className=" w-full min-h-[1px] rounded-full bg-gray-300"></div>
                      <div className="flex justify-between items-center">
                        <span>
                          From :
                          <span className="  font-bold">
                            ${item.cheapestPrice}
                          </span>
                        </span>
                        <span className=" flex items-center gap-2 text-gray-300">
                          <FaClock /> 4 days
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Featured;

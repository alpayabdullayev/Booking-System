import React, { useEffect, useState } from "react";
import SectionTitle from "../../common/sectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// import useFetch from "../../../hooks/useFetch";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";

const TopDestinations = () => {
  // const { data, loading, error } = useFetch(
  //   "/hotels/countByCity?cities=berlin,madrid,london"
  // );

  const [data, setdata] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  async function getAll() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/countByCity/?cities=berlin,baku,gence,london,california"
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

  console.log(data);
  const breakpoints = {
    968: {
      spaceBetween: 30,
      slidesPerView: 5,
    },
    640: {
      spaceBetween: 20,
      slidesPerView: 4,
    },

    0: {
      spaceBetween: 20,
      slidesPerView: 2,
    },
  };

  const { t, i18n } = useTranslation();
  function changeLang(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <section className="py-20 ">
      <div className="wrapper">
        <SectionTitle>{t("Top destinations")}</SectionTitle>

        <div className="py-10">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            breakpoints={breakpoints}
            loop={true}
            modules={[Pagination]}
            className="mySwiper"
          >
            {IsLoading ? (
              <p>Loading please wait...</p>
            ) : (
              <>
                <SwiperSlide>
                  <div className="text-center flex flex-col gap-3 items-center justify-center">
                    <div className="">
                      <img
                        src="https://modtour.travelerwp.com/wp-content/uploads/2022/04/New-Jersey-400x400.jpg"
                        alt=""
                        className=" rounded-full w-full"
                      />
                    </div>
                    <div className="flex justify-center items-center flex-col gap-1">
                      <h1 className="font-bold  hover:text-blue-600 duration-300 cursor-pointer text-lg">
                        Berlin
                      </h1>
                      <p className=" cursor-pointer hover:text-blue-600 duration-200 font-semibold  text-gray-600">
                        {data[0]} Hotels
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="text-center flex flex-col gap-3 items-center justify-center">
                    <div className="">
                      <img
                        src="https://res.cloudinary.com/dfmannche/image/upload/v1708709284/mnjs4nswepn5dntnvk5w.jpg"
                        alt=""
                        className=" rounded-full w-full "
                      />
                    </div>
                    <div className="flex justify-center items-center flex-col gap-1">
                      <h1 className="font-bold  hover:text-blue-600 duration-300 cursor-pointer text-lg">
                        Baku
                      </h1>
                      <p className=" cursor-pointer hover:text-blue-600 duration-200 font-semibold  text-gray-600">
                        {data[1]} Hotels
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="text-center flex flex-col gap-3 items-center justify-center">
                    <div className="">
                      <img
                        src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/Nevada_-400x400.jpg"
                        alt=""
                        className=" rounded-full w-full"
                      />
                    </div>
                    <div className="flex justify-center items-center flex-col gap-1">
                      <h1 className="font-bold  hover:text-blue-600 duration-300 cursor-pointer text-lg">
                        Gence
                      </h1>
                      <p className=" cursor-pointer hover:text-blue-600 duration-200 font-semibold  text-gray-600">
                        {data[2]} Hotels
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="text-center flex flex-col gap-3 items-center justify-center">
                    <div className="">
                      <img
                        src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/Virginia-400x400.jpg"
                        alt=""
                        className=" rounded-full w-full"
                      />
                    </div>
                    <div className="flex justify-center items-center flex-col gap-1">
                      <h1 className="font-bold  hover:text-blue-600 duration-300 cursor-pointer text-lg">
                        London
                      </h1>
                      <p className=" cursor-pointer hover:text-blue-600 duration-200 font-semibold  text-gray-600">
                        {data[3]} Hotels
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="text-center flex flex-col gap-3 items-center justify-center">
                    <div className="">
                      <img
                        src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/Los-Angeles-400x400.jpg"
                        alt=""
                        className=" rounded-full w-full"
                      />
                    </div>
                    <div className="flex justify-center items-center flex-col gap-1">
                      <h1 className="font-bold  hover:text-blue-600 duration-300 cursor-pointer text-lg">
                        California
                      </h1>
                      <p className=" cursor-pointer hover:text-blue-600 duration-200 font-semibold  text-gray-600">
                        {data[4]} Hotels
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="text-center flex flex-col gap-3 items-center justify-center">
                    <div className="">
                      <img
                        src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/New-York-City-400x400.jpg"
                        alt=""
                        className=" rounded-full w-full"
                      />
                    </div>
                    <div className="flex justify-center items-center flex-col gap-1">
                      <h1 className="font-bold  hover:text-blue-600 duration-300 cursor-pointer text-lg">
                        New Jersey
                      </h1>
                      <p className=" cursor-pointer hover:text-blue-600 duration-200 font-semibold  text-gray-600">
                        2 Hotels
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;

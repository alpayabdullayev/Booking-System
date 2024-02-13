import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const OurClientSay = () => {
  const breakpoints = {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    960: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  };
  return (
    <>
      <section className=" py-20  bg-[#F7F8FA]">
        <div className="wrapper">
          <div className="text-left ">
            <h1 className="[font-size:_clamp(1em,2vw,5em)] font-bold">
              What our clients say
            </h1>
          </div>
          <div className=" py-10">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              breakpoints={breakpoints}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, FreeMode, Pagination]}
              className="mySwiper"
              loop={true}
            >
              <SwiperSlide>
                <div className="py-6 px-4  bg-white rounded-xl shadow-md ">
                  <p className="py-2 ">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Massa amet condimentum in pretium. Montes tristique amet
                    pellentesque ut fames condimentum.”
                  </p>

                  <div className="py-4 flex flex-col  gap-1">
                    <div className="">
                      <span className="flex items-center gap-2 text-yellow-400">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </span>
                    </div>
                    <h5 className=" font-bold   ">Darlene Robertson</h5>
                    <p className=" text-gray-600 text-sm">Customers in U.S.A</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="py-6 px-4  bg-white rounded-xl shadow-md ">
                  <p className="py-2 ">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Massa amet condimentum in pretium. Montes tristique amet
                    pellentesque ut fames condimentum.”
                  </p>

                  <div className="py-4 flex flex-col  gap-1">
                    <div className="">
                      <span className="flex items-center gap-2 text-yellow-400">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </span>
                    </div>
                    <h5 className=" font-bold   ">Darlene Robertson</h5>
                    <p className=" text-gray-600 text-sm">Customers in U.S.A</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="py-6 px-4  bg-white rounded-xl shadow-md ">
                  <p className="py-2 ">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Massa amet condimentum in pretium. Montes tristique amet
                    pellentesque ut fames condimentum.”
                  </p>

                  <div className="py-4 flex flex-col  gap-1">
                    <div className="">
                      <span className="flex items-center gap-2 text-yellow-400">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </span>
                    </div>
                    <h5 className=" font-bold   ">Darlene Robertson</h5>
                    <p className=" text-gray-600 text-sm">Customers in U.S.A</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="py-6 px-4  bg-white rounded-xl shadow-md ">
                  <p className="py-2 ">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Massa amet condimentum in pretium. Montes tristique amet
                    pellentesque ut fames condimentum.”
                  </p>

                  <div className="py-4 flex flex-col  gap-1">
                    <div className="">
                      <span className="flex items-center gap-2 text-yellow-400">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </span>
                    </div>
                    <h5 className=" font-bold   ">Darlene Robertson</h5>
                    <p className=" text-gray-600 text-sm">Customers in U.S.A</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="py-6 px-4  bg-white rounded-xl shadow-md ">
                  <p className="py-2 ">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Massa amet condimentum in pretium. Montes tristique amet
                    pellentesque ut fames condimentum.”
                  </p>

                  <div className="py-4 flex flex-col  gap-1">
                    <div className="">
                      <span className="flex items-center gap-2 text-yellow-400">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </span>
                    </div>
                    <h5 className=" font-bold   ">Darlene Robertson</h5>
                    <p className=" text-gray-600 text-sm">Customers in U.S.A</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="py-6 px-4  bg-white rounded-xl shadow-md ">
                  <p className="py-2 ">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Massa amet condimentum in pretium. Montes tristique amet
                    pellentesque ut fames condimentum.”
                  </p>

                  <div className="py-4 flex flex-col  gap-1">
                    <div className="">
                      <span className="flex items-center gap-2 text-yellow-400">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </span>
                    </div>
                    <h5 className=" font-bold   ">Darlene Robertson</h5>
                    <p className=" text-gray-600 text-sm">Customers in U.S.A</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurClientSay;

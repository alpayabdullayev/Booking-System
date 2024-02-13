import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "../index.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const HotelDetailSlider = ({ data }) => {
  const breakpoints = {
    968: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    640: {
      spaceBetween: 20,
      slidesPerView: 1,
    },
    0: {
      spaceBetween: 20,
      slidesPerView: 1,
    },
  };
  return (
    <>
      <Swiper
        slidesPerView={3}
        breakpoints={breakpoints}
        spaceBetween={30}
        centeredSlides={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        // autoplay={{
        //   delay: 500,
        //   disableOnInteraction: false,
        // }}
        loop={true}
      >
        {data &&
          data.images.map((item) => (
            <SwiperSlide key={data._id}>
              <div>
                <img src={item} alt={`Slide `} className=" rounded-md" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default HotelDetailSlider;

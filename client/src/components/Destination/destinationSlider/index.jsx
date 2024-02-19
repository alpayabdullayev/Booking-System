import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const DestinationSlider = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getAll() {
    try {
      const res = await axios.get(`http://localhost:8000/api/destination/65cd10526f3b0621bb8e62bd`);
      setData(res.data);
      console.log(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

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

  let slides = null;

  if (isLoading) {
    slides = <p>Loading...</p>;
  } else if (data && data.images) {
    slides = data.images.map((item) => (
      <SwiperSlide key={item._id}>
        <div>
          <img src={item} alt={`Slide`} className="rounded-md" />
        </div>
      </SwiperSlide>
    ));
  } else {
    slides = <p>No images available</p>;
  }

  return (
    <>
      <Swiper
        slidesPerView={3}
        breakpoints={breakpoints}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {slides}
      </Swiper>
    </>
  );
};

export default DestinationSlider;

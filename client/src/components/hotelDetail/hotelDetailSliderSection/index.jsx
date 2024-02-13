import React from "react";
import HotelDetailSlider from "../hotelDetailSlider";

const HotelDetailSliderSection = ({data}) => {
  return (
    <>
      <section className="py-10">
        <div className="px-4">
          <HotelDetailSlider data={data} />
        </div>
      </section>
    </>
  );
};

export default HotelDetailSliderSection;

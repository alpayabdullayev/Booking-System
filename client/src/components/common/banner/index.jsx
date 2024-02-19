import React from "react";

const Banner = () => {
  return (
    <>
      <section className="pt-20 pb-10">
        <div className="wrapper">
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-11">
            <div className=" rounded-3xl group overflow-hidden relative">
              <img
                src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/Frame-3151-min.png"
                alt=""
                className=" group-hover:scale-105 duration-300 "
              />
            </div>
            <div className=" rounded-3xl group overflow-hidden relative">
              <img
                src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/Frame-3150-min.png"
                alt=""
                className=" group-hover:scale-105 duration-300 "
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;

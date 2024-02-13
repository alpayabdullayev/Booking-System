import { Button } from "@/components/ui/button";
import React from "react";

const Sub = () => {
  return (
    <>
      <section className="py-20">
        <div className="wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <div>
              <img
                src="https://modtour.travelerwp.com/wp-content/uploads/2022/04/Rectangle-7-min.png"
                alt=""
                className=" rounded-l-lg"
              />
            </div>
            <div className="flex w-full bg-[#f7f8fa] border py-10 px-4  rounded-r-lg justify-center gap-4 flex-col items-center">
              <h1 className="text-xl w-full md:w-9/12 text-center [font-size:_clamp(1em,2vw,5em)]  font-bold">
                Get special offers, and more from Traveler
              </h1>
              <p className=" text-center w-full  md:w-6/12 text-gray-600">
                Subscribe to see secret deals prices drop the moment you sign
                up!
              </p>
              <div className="relative w-full md:w-9/12 ">
                <input
                  className=" py-5 px-10  relative  focus:border-blue-200 rounded-full border w-full "
                  placeholder="Email Address"
                  type="text"
                />
                <div className=" absolute top-2  right-3">
                  <Button>Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sub;

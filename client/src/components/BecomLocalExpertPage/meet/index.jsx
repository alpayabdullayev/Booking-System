import SectionTitle from "@/components/common/sectionTitle";
import React from "react";
import Tilt from "react-parallax-tilt";

const Meet = () => {
  return (
    <>
      <section className="py-20 bg-[#f7f8fa]">
        <div className="wrapper">
          <SectionTitle
            children={"Meet the superhosts"}
            text={
              "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, cons, adipisci velit, sed quia non numquam eius modi ullma tempora incidunt ut."
            }
          />
          <div className="py-10">
            <div className="grid grid-cols-1 gap-10  md:grid-cols-2 lg:grid-cols-4">
              <div className="flex justify-center items-center gap-3  flex-col">
                <div className="   ">
                  <Tilt>
                    <img
                      src="https://modtour.travelerwp.com/wp-content/uploads/2022/06/host-1-300x300.png"
                      alt=""
                      className=" object-cover "
                    />
                  </Tilt>
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <h5 className=" font-bold text-lg">Darlene Robertson</h5>
                  <p className=" text-gray-600">Host in Atlanta</p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3  flex-col">
                <div className="   ">
                  <Tilt>
                    <img
                      src="https://modtour.travelerwp.com/wp-content/uploads/2022/06/host-1-300x300.png"
                      alt=""
                      className=" object-cover "
                    />
                  </Tilt>
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <h5 className=" font-bold text-lg">Darlene Robertson</h5>
                  <p className=" text-gray-600">Host in Atlanta</p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3  flex-col">
                <div className="   ">
                  <Tilt>
                    <img
                      src="https://modtour.travelerwp.com/wp-content/uploads/2022/06/host-1-300x300.png"
                      alt=""
                      className=" object-cover "
                    />
                  </Tilt>
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <h5 className=" font-bold text-lg">Darlene Robertson</h5>
                  <p className=" text-gray-600">Host in Atlanta</p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3  flex-col">
                <div className="   ">
                  <Tilt>
                    <img
                      src="https://modtour.travelerwp.com/wp-content/uploads/2022/06/host-1-300x300.png"
                      alt=""
                      className=" object-cover "
                    />
                  </Tilt>
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <h5 className=" font-bold text-lg">Darlene Robertson</h5>
                  <p className=" text-gray-600">Host in Atlanta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Meet;

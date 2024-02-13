import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import "./index.scss";
import { MdCurtainsClosed } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef(null);
  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  const handleVideoClose = (e) => {
    if (videoRef.current && !videoRef.current.contains(e.target)) {
      closeVideo();
    }
  };
  const handleVideoOpen = () => {
    setIsVideoOpen(!isVideoOpen);
  };
  return (
    <>
      <section className="py-20 ">
        <div className="wrapper">
          <div className=' bg-[url("https://modtour.travelerwp.com/wp-content/uploads/2022/06/image.png")] min-h-[80vh] bg-cover bg-no-repeat bg-center'>
            <div className="flex flex-col gap-4 min-h-[80vh] justify-center items-center">
              <h1 className=" [font-size:_clamp(2em,2vw,10em)] text-white font-bold  w-full md:w-5/12 text-center">
                You can become a Local Expert anything, anywhere
              </h1>
              <div
                className=" w-20 h-20 flex justify-center items-center rounded-full bg-white"
                onClick={() => handleVideoOpen()}
              >
                <span className=" text-blue-600 ">
                  <FaPlay />
                </span>
              </div>
              <div
                className={`${isVideoOpen ? "video" : "dnone"}`}
                onClick={handleVideoClose}
              >
                <div className="closebtn">
                  <IoMdClose onClick={() => handleVideoOpen()} />
                </div>
                <iframe
                  ref={videoRef}
                  width="937"
                  height="527"
                  src="https://www.youtube.com/embed/c35ZO5Z0vHA"
                  title="Forza Neftçi Corteo / qarabağ - Neftçi Bakı / 18.12.2023"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

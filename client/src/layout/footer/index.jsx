import React from "react";
import "./index.scss";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="bg-[#f7f8fa] pt-20 ">
        <div className="wrapper pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-10">
            <div className="">
              <h3 className=" text-2xl font-bold">Support</h3>
              <ul className="footerLinks flex text-gray-600 flex-col gap-3 py-4">
                <li>Help Center</li>
                <li>Our COVID-19 Response</li>
                <li>Cancellation options</li>
                <li>Safety information</li>
              </ul>
            </div>
            <div className="">
              <h3 className=" text-xl font-bold">Company</h3>
              <ul className="footerLinks flex text-gray-600 flex-col gap-3  py-4">
                <li className=" ">About us</li>
                <li className="">Community Blog</li>
                <li className="">Careers</li>
                <li className="">Privacy policy</li>
                <li className="">Terms of service</li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className=" text-2xl font-bold">Contact</h3>
              <ul className="footerLinks flex text-gray-600 flex-col gap-3 py-4">
                <li className="">Partnerships</li>
                <li className="">FAQ</li>
                <li className="">Get in touch</li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className=" text-2xl font-bold">Social</h3>
              <ul className="flex flex-col gap-3 py-4">
                <li className=" flex cursor-pointer gap-4 items-center flex-wrap text-3xl">
                  <span className=" text-[#1877F2]">
                    <FaFacebook />
                  </span>
                  <span className=" text-[#833AB4]">
                    <FaInstagram />
                  </span>
                  <span className=" text-[#1DA1F2]">
                    <FaTwitter />
                  </span>
                  <span className=" text-[#FF0000]">
                    <FaYoutube />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-col gap-4  items-center py-4 border-t border-gray-300 justify-center sm:flex-row flex sm:justify-between wrapper">
          <p className=" font-medium">© Copyright Traveler 2024 by Alphay09</p>
          <div className=" ">
            <img
              src="https://modtour.travelerwp.com/wp-content/uploads/2022/06/Frame-3182.svg"
              alt=""
              className=" w-2 sm:w-full"
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

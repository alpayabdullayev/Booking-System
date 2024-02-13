import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="bg-[#f7f8fa] pt-20 ">
        <div className="wrapper pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-10">
            <div className="">
              <h3 className=" text-2xl font-bold">Support</h3>
              <ul className="flex text-gray-600 flex-col gap-3 py-4">
                <li>Help Center</li>
                <li>Our COVID-19 Response</li>
                <li>Cancellation options</li>
                <li>Safety information</li>
              </ul>
            </div>
            <div className="">
              <h3 className=" text-xl font-bold">Company</h3>
              <ul className="flex text-gray-600 flex-col gap-3  py-4">
                <p className=" ">About us</p>
                <p className="">Community Blog</p>
                <p className="">Careers</p>
                <p className="">Privacy policy</p>
                <p className="">Terms of service</p>
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className=" text-2xl font-bold">Contact</h3>
              <ul className="flex text-gray-600 flex-col gap-3 py-4">
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
      </footer>
    </>
  );
};

export default Footer;

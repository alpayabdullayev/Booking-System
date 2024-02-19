import React from "react";
import { FaBed, FaCar } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { FaTaxi } from "react-icons/fa";
import SearchComponents from "../common/Search";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  function changeLang(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <>
      <div className=" py-10 bg-[url('https://modtour.travelerwp.com/wp-content/uploads/2022/04/Banner.png')] bg-center bg-cover bg-no-repeat min-h-[70vh]   pb-10">
        <div className="wrapper">
          <ul className="text-white  flex flex-wrap gap-8 items-center min-h-[60px]">
            <li className="flex hover:text-blue-800  border rounded-full p-2    duration-300 items-center gap-2 text-xl cursor-pointer">
              <span>
                <FaBed />
              </span>
              {t("Hotel")}
            </li>
            <li className="flex hover:text-blue-800 duration-300 items-center gap-2 text-xl cursor-pointer">
              <span>
                <MdFlight />
              </span>
              {t("Flights")}
            </li>
            <li className="flex hover:text-blue-800 duration-300 items-center gap-2 text-xl cursor-pointer">
              <span>
                <FaCar />
              </span>
              {t("Car rentals")}
            </li>
          </ul>
          <div className="py-5 text-white">
            <h1 className="[font-size:_clamp(2em,4vw,10em)] text-white font-bold ">
              {t("Find")}
            </h1>
            <p className="w-8/12">{t("Worldwide")}</p>
          </div>
          <SearchComponents />
        </div>
      </div>
    </>
  );
};

export default Header;

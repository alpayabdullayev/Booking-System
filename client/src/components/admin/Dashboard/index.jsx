import React from "react";
import {
  FaBed,
  FaCalendar,
  FaHome,
  FaHotel,
  FaRegCalendar,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { FaQuestion } from "react-icons/fa";
const Dashboard = () => {
  return (
    <>
      <div className=" min-h-screen bg-white-600 fixed left-0 top-0 bottom-0 w-2/12">
        <div className="flex justify-center  py-6">
          <h1 className="[font-size:_clamp(1em,2vw,5em)] text-black">
            Traveler.
          </h1>
        </div>
        <ul className="  text-black px-10">
          <li className=" flex items-center gap-1">
            <span>
              <FaHome />
            </span>{" "}
            <Link to={"/admin"}>Dashboard</Link>
          </li>
        </ul>
        <div className="py-6">
          <span className=" px-8 text-gray-500 text-sm">Components</span>
          <ul className="text-black flex flex-col gap-2 pt-2  px-10 ">
            <li className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                <FaUser />
              </span>{" "}
              <Link to={"/admin/users"} className="font-bold">
                Users
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                <FaBed />
              </span>{" "}
              <Link to={"/admin/hotel"} className=" font-bold">
                Hotels
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <span className="text-sm text-gray-400">
                <MdOutlineMeetingRoom />
              </span>{" "}
              <Link to={"/admin/room"} className=" font-bold">
                Rooms
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <span className="text-sm text-gray-400">
                <FaRegCalendar />
              </span>{" "}
              <Link to={"/admin/book"} className=" font-bold">
                Bookings
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <span className=" text-sm text-gray-400">
                <FaQuestion />
              </span>{" "}
              <Link to={"/admin/faq"} className=" font-bold">
                FAQ
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <span className=" text-sm text-gray-400">
                <CiSettings />
              </span>{" "}
              <Link className=" font-bold">Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

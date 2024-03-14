import React, { useContext } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { BiUser } from "react-icons/bi";
import { UserContext } from "@/context/userContext";
import { CiLogout } from "react-icons/ci";

const Dashboard = () => {
 
  const { user, setUser, role, setRole, setToken } = useContext(UserContext);
  const removeStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setToken(null);
    setRole(null);
    setUser(null);
  };
  return (
    <>
      {/* <div className=" fixed top-0 py-5  right-0 bg-white left-0">
        <div className="wrapper">
          <div className=" px-8  z-50 bg-white flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className=" bg-white  w-10 h-10  relative text-lg rounded-full  shadow-md border flex  justify-center items-center">
                  <span className=" relative">
                    <BiUser />
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {role ? (
                    <>
                      <span>Hi, {user}</span>
                    </>
                  ) : (
                    <>BookingWeb</>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {role === "admin" || role === "superAdmin" ? (
                    <NavLink to={"/admin"} className=" w-full">
                      Dashboard
                    </NavLink>
                  ) : role === "user" ? (
                    <NavLink to={"/listing"} className=" w-full">
                      Booking
                    </NavLink>
                  ) : (
                    <>
                      <p>
                        <NavLink to={"/login"}>Login</NavLink>
                      </p>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {role ? (
                    <>
                      <p>
                        <NavLink to={"/profile"}>Profile</NavLink>
                      </p>
                    </>
                  ) : (
                    <>
                      {" "}
                      <NavLink to={"/register"}>Register</NavLink>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {role ? (
                    <>
                      <p>
                        <NavLink to={"/wishlist"}>Wishlist</NavLink>
                      </p>
                    </>
                  ) : (
                    <>
                      <NavLink to={"/about"}>About</NavLink>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {role ? (
                    <>
                      <button onClick={() => removeStorage()}>Log out</button>
                    </>
                  ) : (
                    <>
                      <NavLink to={"/faq"}>FAQ</NavLink>
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div> */}
      <div className=" z-[10] min-h-screen bg-white-600 fixed left-0 top-0 bottom-0 w-2/12">
        <div className="flex justify-center  py-6">
          <h1 className="[font-size:_clamp(1em,2vw,5em)] text-black">
            <Link to={"/"}>Traveler</Link>
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
            <li className="flex items-center gap-1">
              <span className="  text-gray-400">
                <CiLogout />
              </span>{" "}
              <div className=" font-bold">
                <button onClick={() => removeStorage()}>Log out</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

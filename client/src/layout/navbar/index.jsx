import React from "react";
import {
  FaBars,
  FaUser,
  FaUserAlt,
  FaUserAstronaut,
  FaUserCircle,
  FaUserFriends,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <>
      <nav className=" bg-white ">
        <div className="wrapper">
          <div className="flex justify-between items-center min-h-[90px] flex-wrap">
            <div>
              <Link to={"/"}>
                <img
                  src="https://modtour.travelerwp.com/wp-content/uploads/2022/04/Color-2.svg"
                  alt=""
                  className="h-14 "
                />
              </Link>
            </div>
            <NavigationMenu className="py-2 hidden lg:flex">
              <NavigationMenuList className="flex gap-7">
                <NavigationMenuItem>
                  <Link to={"/"} legacyBehavior passHref>
                    <NavigationMenuLink className="text-black font-bold">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to={"/about"} legacyBehavior passHref>
                    <NavigationMenuLink className="text-black  font-bold">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="text-black font-bold">
                  <NavigationMenuTrigger className="font-bold">
                    Listing
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className=" ">
                    <ul className="grid   gap-3    p-6 md:w-[100px] lg:w-[200px] ">
                      <li className="row-span-3 cursor-pointer">
                        Search Hotel Sidebar
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className=" font-bold">
                    Tour
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="  ">
                    <ul className="grid   gap-3    p-6 md:w-[100px] lg:w-[200px] ">
                      <li className="row-span-3">Tour Package</li>
                      <li className="row-span-3">Tour StartTime</li>
                      <li className="row-span-3">Book</li>
                      <li className="row-span-3">Become Local Expert</li>
                      <li className="row-span-3">Inquiry Form</li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className=" font-bold">
                    Pages
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="  ">
                    <ul className="grid   gap-3    p-6 md:w-[100px] lg:w-[200px] ">
                      <li className="row-span-3">Blog</li>
                      <li className="row-span-3">Destination</li>
                      <li className="row-span-3">FAQ</li>
                      <li className="row-span-3">Become Local Expert</li>
                      <li className="row-span-3">FAQ</li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to={"/contact"} legacyBehavior passHref>
                    <NavigationMenuLink className="text-black font-bold">
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="hidden lg:flex justify-between  items-center gap-3 flex-wrap">
              <div>
                <span className="flex items-center gap-1 font-semibold">
                  EN
                  <span className="text-gray-600 text-sm">
                    <IoIosArrowDown />
                  </span>
                </span>
              </div>
              <div className="w-10 h-10  relative text-lg rounded-full  shadow-md border flex  justify-center items-center">
                <span className=" relative">
                  <FaShoppingBasket />
                </span>
              </div>
              <div className="relative">
                <span className="absolute  bottom-2 right-2 text-[10px] bg-orange-500 rounded-full w-5 h-5  text-white flex justify-center items-center">
                  1
                </span>
              </div>
              <div className="w-10 h-10  relative text-lg rounded-full  shadow-md border flex  justify-center items-center">
                <span className=" relative">
                  <BiUser />
                </span>
              </div>

              {/* <div>
                <button className="py-2 px-2 bg-white  hover:bg-black duration-300  hover:text-white rounded-md ">
                  Login
                </button>
              </div>
              <div>
                <button className="py-2 px-2 bg-white  hover:bg-black  duration-300  hover:text-white rounded-md  ">
                  Regsiter
                </button>
              </div> */}
            </div>
            <div className="flex lg:hidden">
              <div>
                <span className="text-black cursor-pointer">
                  <FaBars />
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

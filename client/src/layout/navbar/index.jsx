import React, { useContext, useEffect, useState } from "react";
import {
  FaBars,
  FaHeart,
  FaUser,
  FaUserAlt,
  FaUserAstronaut,
  FaUserCircle,
  FaUserFriends,
} from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { UserContext } from "@/context/userContext";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { CiHeart } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GlobalContext } from "@/context/GlobalContext";
import MainCardSkeleton from "@/components/common/mainCardSkeleton";
import MainCard from "@/components/common/mainCard";

const Navbar = () => {
  const { user, setUser, role, setRole, setToken } = useContext(UserContext);
  const { setWishlist } = useContext(GlobalContext);
  const removeStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setToken(null);
    setRole(null);
    setUser(null);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log("salam");
  };

  const { t, i18n } = useTranslation();
  function changeLang(lang) {
    i18n.changeLanguage(lang);
  }

  const { wishlist, fetchWishlist } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWishlist().then(() => setIsLoading(false));
  }, []);
  // console.log(wishlist)
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
                  <NavLink
                    activeClassName={"active"}
                    to={"/"}
                  >
                    <NavigationMenuLink className="text-black font-bold">
                      {t("Home")}
                    </NavigationMenuLink>
                  </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to={"/about"} legacyBehavior passHref>
                    <NavigationMenuLink className="text-black  font-bold">
                      {t("About")}
                    </NavigationMenuLink>
                  </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="text-black font-bold">
                  <NavigationMenuTrigger className="font-bold">
                    {t("Listing")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className=" ">
                    <ul className="grid   gap-3    p-6 md:w-[100px] lg:w-[200px] ">
                      <li className="row-span-3 cursor-pointer">
                        <NavLink to={"/listing"}> Search Hotel Sidebar</NavLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className=" font-bold">
                    {t("Hotel")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="  ">
                    <ul className="grid   gap-3    p-6 md:w-[100px] lg:w-[200px] ">
                      <li className="row-span-3">
                        <NavLink to={"/listing"}>Book</NavLink>
                      </li>
                      <li className="row-span-3">
                        <NavLink to={"/expert"}>Become Local Expert</NavLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className=" font-bold">
                    {t("Pages")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="  ">
                    <ul className="grid   gap-3    p-6 md:w-[100px] lg:w-[200px] ">
                      <li className="row-span-3">
                        <NavLink to={"/blogs"}>Blog</NavLink>
                      </li>
                      <li className="row-span-3">
                        <NavLink to={"/faq"}>FAQ</NavLink>
                      </li>
                      <li className="row-span-3">
                        <NavLink to={"/expert"}>Become Local Expert</NavLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink to={"/contact"} legacyBehavior passHref>
                    <NavigationMenuLink className="text-black font-bold">
                      {t("Contact")}
                    </NavigationMenuLink>
                  </NavLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="hidden lg:flex justify-between  items-center gap-3 flex-wrap">
              <div className="relative cursor-pointer">
                <p
                  className="flex items-center text-right"
                  onClick={handleClick}
                >
                  EN <IoIosArrowDown />
                </p>

                <div className={`changeLang   ${isOpen ? "isOpen" : ""}   `}>
                  <ul className=" text-white z-[9999999999999999]">
                    <li onClick={() => changeLang("en")}>EN</li>
                    <li onClick={() => changeLang("az")}>AZ</li>
                  </ul>
                </div>
              </div>

              <Sheet>
                <SheetTrigger>
                  <div>
                    <div className="w-10 h-10  relative text-lg rounded-full  shadow-md border flex  justify-center items-center">
                      <span className=" font-bold text-xl relative">
                        <CiHeart />
                      </span>
                    </div>
                  </div>
                </SheetTrigger>
                <SheetContent style={{ maxHeight: "100vh", overflowY: "auto" }}>
                  <SheetHeader>
                    <SheetTitle>Your Favorite Hotels</SheetTitle>
                    <SheetDescription>
                      {isLoading ? (
                        <>
                          <div className="grid grid-cols-1 gap-10 ">
                            <MainCardSkeleton />
                          </div>
                        </>
                      ) : (
                        <div className="grid grid-cols-1 gap-10 ">
                          {wishlist &&
                            wishlist.map((item) => (
                              <MainCard
                                key={item._id}
                                item={item.hotel}
                                {...item.hotel}
                              />
                            ))}
                        </div>
                      )}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="  w-10 h-10  relative text-lg rounded-full  shadow-md border flex  justify-center items-center">
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

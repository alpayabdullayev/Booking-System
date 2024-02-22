import { GlobalContext } from "@/context/GlobalContext";
import React, { useContext } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaClock, FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const MainCard = ({ item }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < item.hotelStars; i++) {
      stars.push(<FaStar key={i} />);
    }
    return stars;
  };

  const { handleAddToWishlist, wishlist } = useContext(GlobalContext);

  return (
    <>
      <div className="group rounded-xl shadow-md" key={item._id}>
        <div className="relative overflow-hidden rounded-t-xl">
          <Link to={`/hotelDetail/${item._id}`}>
            <img
              src={item.mainImage}
              alt=""
              className="w-full group-hover:scale-105 duration-300 h-52 object-cover"
            />
          </Link>

          <div className="absolute top-2 left-2">
            {item.featured === true ? (
              <p className="p-1 bg-red-600 text-white font-bold rounded-md">
                Featured
              </p>
            ) : null}
          </div>
          <div className="absolute top-2 right-2">
            <button onClick={() => handleAddToWishlist(item._id)}>
              <span>
                {wishlist.find((x) => x.hotel._id === item._id) ? (
                  <span className="text-red-500">
                    <FaHeart />
                  </span>
                ) : (
                  <span className="">
                    <FaHeart />
                  </span>
                )}
                {/* <FaHeart /> */}
              </span>
            </button>
            {/* <button onClick={() => handleAddToWishlist(item._id)}>
              {item.wishlist.some((product) => product._id === item._id) ? (
                <span className="text-red-500">
                  <FaHeart />
                </span>
              ) : (
                <span className="">
                  <FaHeart />
                </span>
              )}
            </button> */}
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <p className="flex items-center gap-1 capitalize">
            <CiLocationOn /> {item.city}
          </p>
          <h1 className="text-xl font-bold group-hover:text-blue-800 duration-200">
            {item.name}
          </h1>
          <p className="flex items-center gap-2">
            <span className="text-yellow-500 flex gap-1 items-center">
              {renderStars()}
            </span>
          </p>
          <div className="w-full min-h-[1px] rounded-full bg-gray-300"></div>
          <div className="flex justify-between items-center">
            <span>
              From :<span className="font-bold">${item.cheapestPrice}</span>
            </span>
            <span className="flex items-center gap-2 text-gray-300">
              <FaClock /> 4 days
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainCard;

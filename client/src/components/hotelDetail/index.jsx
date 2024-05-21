import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaBed, FaHeart, FaStar } from "react-icons/fa";
import { CiHeart, CiLocationOn, CiPlay1, CiShare2 } from "react-icons/ci";
import { IoFootstepsOutline } from "react-icons/io5";
import { MdLocationCity, MdOutlineGTranslate } from "react-icons/md";
import { VscVerifiedFilled } from "react-icons/vsc";
import { TbTag } from "react-icons/tb";
import Featured from "../HomePage/featured";
import { RiPinDistanceLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import "./index.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./index.scss";
import { differenceInDays } from "date-fns";
import { io } from "socket.io-client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { SearchContext } from "@/context/SearchContext";
import SearchComponents from "../common/Search";
import HotelDetailSlider from "./hotelDetailSlider";
import HotelDetailSliderSection from "./hotelDetailSliderSection";
import { UserContext } from "@/context/userContext";
import Reserve from "../Reserve";
import { DateRangePicker } from "react-date-range";
import { IoBedOutline } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import { BsPersonStanding } from "react-icons/bs";
import { MdOutlineChildFriendly } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import MapStatic from "../AboutPage/map";
import ContactForm from "../ContactComponents/ContactForm";
import { GlobalContext } from "@/context/GlobalContext";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";

// const socket = io("/", {
//   reconnection: true,
// });

export const HotelDetailSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser, role, setRole, userId, token, setToken } =
    useContext(UserContext);
  const { handleAddToWishlist, wishlist } = useContext(GlobalContext);

  const [data, setdata] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { saveBookingData } = useContext(GlobalContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsRealTime, setCommentsRealTime] = useState([]);

  const shareUrl = `http://localhost:5173/hotelDetail/${id}`;

  // useEffect(() => {
  //   // console.log('SOCKET IO', socket);
  //   socket.on("new-comment", (newComment) => {
  //     setCommentsRealTime((prevComments) => [...prevComments, newComment]);
  //   });
  //   return () => socket.disconnect();
  // }, [socket]);

  // const addComment = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.put(
  //       `http://localhost:8000/api/comment/hotel/${id}`,
  //       { comment, userId }
  //     );
  //     console.log(res.data);
  //     if (res.data.success === true) {
  //       setComment("");
  //       setComments(res.data.reviews);
  //       y;
  //     }
  //     getAll();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // let uiCommentUpdate =
  //   commentsRealTime.length > 0 ? commentsRealTime : comments;

  async function getAll() {
    try {
      const res = await axios.get(`http://localhost:8000/api/find/${id}`);
      setdata(res.data);

      setIsLoading(false);
      // setComments(res.data.reviews);
      // console.log(setComments);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAll();
  }, [id]);

  const { dates, options } = useContext(SearchContext);

  useEffect(() => {
    if (dates && dates.length > 0) {
      const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
      const timeDiff = Math.abs(
        dates[0].endDate.getTime() - dates[0].startDate.getTime()
      );
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      setDays(diffDays);
    }
  }, [dates]);

  useEffect(() => {
    if (options && options.room) {
      setRoomCount(options.room);
    }
  }, [options]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const { register, handleSubmit, reset } = useForm();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const publishableKey =
    "pk_test_51OkuxcGezhrpHtHsTwcCLYYLOyRKuix2BxtNXLolGhkdJykXFX7ZUIdQzWfVxM9OMygZeFYYZgxlDULO4adgAWQY003r8valPM";

  const handleResponse = (isSuccess) => {
    if (isSuccess) {
      console.log("ugurludu");
      toast.success("isledi");
      toast.success("Successfully Rezerv");
    } else {
      console.log("ugursuz");
    }
  };

  const processBooking = async (bookingData, id) => {
    try {
      const bookingResponse = await axios.post(
        `http://localhost:8000/api/book/${id}`,
        bookingData
      );

      if (bookingResponse.status === 201) {
        return true;
      } else {
        console.log("Booking failed");
        return false;
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        toast.error(
          "This room has already been booked for the specified time period"
        );
      } else {
        toast.error("1gun rezerv etmek mumkun deyil");
      }
      return false;
    }
  };

  const handleBooking = async () => {
    try {
      const days = differenceInDays(
        new Date(state[0].endDate),
        new Date(state[0].startDate)
      );

      const calculatedTotalPrice = days * selectedRoom.price;
      setTotalPrice(calculatedTotalPrice);

      const bookingData = {
        ...data,
        room: selectedRoom._id,
        user: userId,
        start_time: state[0].startDate,
        end_time: state[0].endDate,
        total_price: calculatedTotalPrice,
      };

      saveBookingData(bookingData);

      const bookingResult = await processBooking(bookingData, id);
      if (bookingResult) {
        navigate("/checkout");
      } else {
        handleResponse(false);
      }
    } catch (error) {
      handleResponse(false);
      console.error(error);
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <HotelDetailSliderSection data={data} />
      {IsLoading ? (
        <p>Loading....</p>
      ) : (
        data && (
          <>
            <section className="py-10">
              <div className=" wrapper">
                <div className="flex justify-between flex-wrap items-center">
                  <div>
                    <h1 className="[font-size:_clamp(1em,2vw,5em)] font-bold">
                      {data.name}
                    </h1>
                    <p className="flex flex-wrap items-center gap-3">
                      <span className=" text-yellow-500">
                        <FaStar />
                      </span>
                      <span className=" font-bold  flex-wrap flex gap-1">
                        5
                        <span className=" font-normal text-base text-gray-600">
                          (2 Reviews) - {data.address}
                        </span>
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10   text-lg rounded-full  shadow-md border flex  justify-center items-center">
                      <span className=" ">
                        <CiPlay1 />
                      </span>
                    </div>
                    <div className="w-10 h-10   text-lg rounded-full  shadow-md border flex  justify-center items-center">
                      <button onClick={() => handleAddToWishlist(data?._id)}>
                        <span>
                          {wishlist.find((x) => x?.hotel?._id === data?._id) ? (
                            <span className="text-red-500">
                              <FaHeart />
                            </span>
                          ) : (
                            <span className=" text-black">
                              <FaHeart />
                            </span>
                          )}
                          {/* <FaHeart /> */}
                        </span>
                      </button>
                    </div>
                    <div className="w-10 h-10   text-lg rounded-full  shadow-md border flex  justify-center items-center">
                      <span className=" ">
                        <WhatsappShareButton
                          url={shareUrl}
                          quote={"Title or jo bhi aapko likhna ho"}
                          hashtag={"#portfolio..."}
                        >
                          <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>
                      </span>
                    </div>

                    {/* <FacebookShareButton
                      url={shareUrl}
                      quote={"Title or jo bhi aapko likhna ho"}
                      hashtag={"#portfolio..."}
                    >
                      <FacebookIcon size={40} round={true} />
                    </FacebookShareButton> */}
                  </div>
                </div>
              </div>
            </section>
          </>
        )
      )}
      {IsLoading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <section className="py-10">
            <div className="wrapper">
              <div className="grid grid-cols-12   gap-10">
                <div className=" col-span-12 flex flex-col gap-10 lg:col-span-8">
                  <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12    rounded-xl text-2xl   border-gray-400 border flex  justify-center items-center">
                        <span className=" ">
                          <RiPinDistanceLine />
                        </span>
                      </div>
                      <div>
                        <h1 className=" font-bold">Distance</h1>
                        <p>{data.distance}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12    rounded-xl text-2xl   border-gray-400 border flex  justify-center items-center">
                        <span className=" ">
                          <IoFootstepsOutline />
                        </span>
                      </div>
                      <div>
                        <h1 className=" font-bold">Type</h1>
                        <p className=" capitalize">
                          {data.type.map((type) => type.name)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12    rounded-xl text-2xl   border-gray-400 border flex  justify-center items-center">
                        <span className=" ">
                          <MdLocationCity />
                        </span>
                      </div>
                      <div>
                        <h1 className=" font-bold">City</h1>
                        <p className=" capitalize">{data.city}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12    rounded-xl text-2xl   border-gray-400 border flex  justify-center items-center">
                        <span className=" ">
                          <MdOutlineGTranslate />
                        </span>
                      </div>
                      <div>
                        <h1 className=" font-bold">Languages</h1>
                        <p>{data.languages.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full min-h-[1px] bg-gray-300"></div>
                  <div className="">
                    <div>
                      <h1 className=" font-bold text-2xl">About this Hotel</h1>
                      <p className="flex flex-col gap-4 py-5">
                        {data?.about}
                        <br />
                        <span>{data?.desc}</span>
                      </p>
                    </div>
                  </div>
                  <div className=" border-b">
                    <h1 className="font-bold text-2xl">Highlights</h1>
                    <ul className="py-5 flex flex-col gap-4 justify-center flex-wrap">
                      <li className="flex items-center gap-3  text-gray-500">
                        <span className=" text-green-300 text-2xl font-bold">
                          <VscVerifiedFilled />
                        </span>
                        Visit eight villages showcasing Polynesian culture
                      </li>
                      <li className="flex items-center gap-3  text-gray-500">
                        <span className=" text-green-300 text-2xl font-bold">
                          <VscVerifiedFilled />
                        </span>
                        Canoe ride, tattoos, spear throwing, ukulele lessons and
                        fishing
                      </li>
                      <li className="flex items-center gap-3  text-gray-500">
                        <span className=" text-green-300 text-2xl font-bold">
                          <VscVerifiedFilled />
                        </span>
                        Spectacular Polynesian evening dinner show ‘Ha: Breath
                        of Life’
                      </li>
                      <li className="flex items-center gap-3  text-gray-500">
                        <span className=" text-green-300 text-2xl font-bold">
                          <VscVerifiedFilled />
                        </span>
                        Optional transportation from Waikiki hotels
                      </li>
                    </ul>
                  </div>
                  <div className="border-b py-5">
                    <h1 className="font-bold text-2xl">Languages</h1>
                    <ul className="pb-5  py-5   flex  flex-wrap gap-10">
                      <li className="flex flex-wrap items-center gap-3 text-xl text-gray-500 ">
                        <span>
                          <TbTag />
                        </span>
                        <span className="text-base">Espanol</span>
                      </li>
                      <li className="flex flex-wrap items-center gap-3 text-xl text-gray-500 ">
                        <span>
                          <TbTag />
                        </span>
                        <span className="text-base">Francais</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-10 py-5">
                    <div>Rooms</div>
                    {data.rooms.map((room) => (
                      <div key={room._id}>
                        <div className=" border rounded-lg  grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
                          <div>
                            <img
                              className="w-full object-cover rounded-lg"
                              src={room.mainImage}
                              alt=""
                            />
                          </div>
                          <div className=" px-4 flex flex-col gap-4 py-4">
                            <h1 className=" text-xl font-bold">{room.name}</h1>

                            <div className=" flex  items-center py-5 gap-4 justify-between">
                              <div className=" flex flex-col justify-center items-center">
                                <div className=" px-4 shadow-md rounded-xl py-4 border">
                                  <IoBedOutline />
                                </div>
                                <span className="">x{room.beds}</span>
                              </div>
                              <div className=" flex flex-col justify-center items-center">
                                <div className=" px-4 shadow-md rounded-xl py-4 border">
                                  <SlSizeFullscreen />
                                </div>
                                <span className="">{room.size}m</span>
                              </div>
                              <div className=" flex flex-col justify-center items-center">
                                <div className=" px-4 shadow-md rounded-xl py-4 border">
                                  <BsPersonStanding />
                                </div>
                                <span className="">x{room.maxPeople}</span>
                              </div>
                              <div className=" flex flex-col justify-center items-center">
                                <div className=" px-4 shadow-md rounded-xl py-4 border">
                                  <MdOutlineChildFriendly />
                                </div>
                                <span className="">x{room.children}</span>
                              </div>
                            </div>
                          </div>
                          <div className=" py-4 px-14">
                            <p className=" py-2   text-white bg-blue-600 rounded-full text-center">
                              price: ${room.price}
                            </p>
                          </div>
                        </div>

                        <p></p>
                        <button
                          onClick={() => {
                            setSelectedRoom(room);
                            setSelectedHotel(data._id);
                          }}
                        >
                          Rezerv et
                        </button>
                      </div>
                    ))}
                  </div>
                  {selectedRoom && (
                    <form
                      className="gap-2 flex flex-col "
                      onSubmit={handleSubmit(handleBooking)}
                    >
                      <DateRangePicker
                        onChange={(data) => setState([data.selection])}
                        ranges={state}
                        direction="horizontal"
                        staticRanges={[]}
                        inputRanges={[]}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        minDate={new Date()}
                      />
                      <div className=" px-2">
                        <button
                          className=" py-2 px-2 bg-blue-500 text-white rounded-md"
                          type="submit"
                        >
                          Rezerv et
                        </button>
                      </div>
                    </form>
                  )}
                  <div className="">
                    <div className="flex flex-wrap py-5 border-t justify-between items-center">
                      <h1 className="font-bold text-2xl">Hotel's Location</h1>
                      <p className="flex items-center gap-1  text-gray-500 capitalize">
                        <CiLocationOn />
                        New York, USA
                      </p>
                    </div>
                    <div>
                      {data && (
                        <div>
                          <div
                            dangerouslySetInnerHTML={{ __html: data.mapAdress }}
                          />
                        </div>
                      )}
                    </div>
                    {/* <div className="space-y-4 w-full px-5 py-5 mt-10 rounded-md  bg-gray-100">
                      {data.reviews.map((comment, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <img
                            className="h-14 w-14 rounded-full object-cover"
                            src={comment?.user?.avatar}
                            alt=""
                          />
                          <div className="flex flex-col">
                            <div className="flex flex-col  space-x-2">
                              <p className="font-bold">
                                {comment?.user?.username}
                              </p>
                              <p className="text-gray-500">
                                {formatDate(comment.created)}
                              </p>
                            </div>
                            <p>{comment.text}</p>
                          </div>
                        </div>
                      ))}{" "}
                      <div>
                        <form
                          onSubmit={addComment}
                          className=" flex gap-4 flex-wrap "
                        >
                          <input
                            type="text"
                            className=" border px-2 py-2  rounded-md"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Enter your comment"
                          />
                          <button
                            className=" py-2 px-2 bg-blue-600 text-white rounded-md"
                            type="submit"
                          >
                            Add Comment
                          </button>
                        </form>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="  col-span-12 lg:col-span-4">
                  <div className="sticky top-5">
                    <div className=" border my-8 py-8 rounded-md">
                      <h5 className="  text-center w-6/12 mx-auto rounded-lg cursor-pointer  font-bold capitalize text-xl py-2  bg-blue-600 text-white ">
                        Inquiry
                      </h5>
                      <ContactForm />
                    </div>
                    <MapStatic />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      )}
      <Featured />;
    </>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaBed, FaStar } from "react-icons/fa";
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
import StripeCheckout from "react-stripe-checkout";
import MapChart from "../AboutPage/MapChart";
import MapStatic from "../AboutPage/map";
import ContactForm from "../ContactComponents/ContactForm";
import { GlobalContext } from "@/context/GlobalContext";
export const HotelDetailSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser, role, setRole, userId, token, setToken } =
    useContext(UserContext);

  const [data, setdata] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { saveBookingData } = useContext(GlobalContext);

  async function getAll() {
    try {
      const res = await axios.get(`http://localhost:8000/api/find/${id}`);
      setdata(res.data);
      console.log(res.data);
      setIsLoading(false);
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

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

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

  //error.response.data.message

  const publishableKey =
    "pk_test_51OkuxcGezhrpHtHsTwcCLYYLOyRKuix2BxtNXLolGhkdJykXFX7ZUIdQzWfVxM9OMygZeFYYZgxlDULO4adgAWQY003r8valPM";

  // const handleSuccess = () => {
  //   console.log("ugurludu");
  // };
  // const handleFailure = () => {
  //   console.log("ugursuz");
  // };
  const handleResponse = (isSuccess) => {
    if (isSuccess) {
      console.log("ugurludu");
      alert("isledi");
      toast.success("Successfully Rezerv");
    } else {
      console.log("ugursuz");

      // toast.success("Successfully Rezerv...");
    }
  };

  // const onSubmit = async (stripeToken) => {
  //   try {
  //     const days = differenceInDays(
  //       new Date(state[0].endDate),
  //       new Date(state[0].startDate)
  //     );

  //     const calculatedTotalPrice = days * selectedRoom.price;
  //     setTotalPrice(calculatedTotalPrice);

  //     const bookingData = {
  //       ...data,
  //       room: selectedRoom._id,
  //       user: userId,
  //       start_time: state[0].startDate,
  //       end_time: state[0].endDate,
  //       total_price: calculatedTotalPrice,
  //     };

  //     const paymentResponse = await axios({
  //       url: "http://localhost:8000/payment",
  //       method: "post",
  //       data: {
  //         amount: calculatedTotalPrice * 100,
  //         token: stripeToken.id,
  //       },
  //     }
  //     );
  //     const MySwal = withReactContent(Swal);
  //     await MySwal.fire({
  //       title: "Rezerv Uğurla Başa Çatdı!",
  //       text: "You clicked the button!",
  //       icon: "success",
  //     });
  //     console.log(paymentResponse)

  //     if (paymentResponse.status === 200) {
  //       const bookingResponse = await axios.post(
  //         `http://localhost:8000/api/book/${id}`,
  //         bookingData
  //       );

  //       if (bookingResponse.status === 200) {
  //         handleResponse(true);
  //         console.log(bookingResponse.data);
  //         reset();
  //         setSelectedRoom(null);
  //         setSelectedHotel(null);
  //       } else {
  //         handleResponse(false);

  //         if (bookingResponse.status === 400) {
  //           toast.error(
  //             "This room has already been booked for the specified time period."
  //           );
  //         } else if (bookingResponse.status === 401) {
  //           toast.error("Invalid date selection.");
  //         }
  //       }
  //     } else {
  //       handleResponse(false);
  //       console.log("Payment failed");
  //     }

  //   } catch (error) {
  //     handleResponse(false);
  //     console.error(error);
  //     if (error.response && error.response.data) {
  //       console.log(error.response.data);
  //     }
  //     toast.error("bu otaglar secilmisdir");
  //   }
  // };

  // Функция для отправки запроса на оплату
  // const processPayment = async (stripeToken, calculatedTotalPrice) => {
  //   try {
  //     const paymentResponse = await axios({
  //       url: "http://localhost:8000/payment",
  //       method: "post",
  //       data: {
  //         amount: calculatedTotalPrice * 100,
  //         token: stripeToken.id,
  //       },
  //     });

  //     if (paymentResponse.status === 200) {
  //       return true; // Возвращаем true, если оплата прошла успешно
  //     } else {
  //       console.log("Payment failed");
  //       return false; // Возвращаем false, если оплата не удалась
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Ошибка при обработке платежа");
  //     return false; // Возвращаем false в случае ошибки
  //   }
  // };

  // Функция для резервирования номера
  // const processBooking = async (bookingData, id) => {
  //   try {
  //     const bookingResponse = await axios.post(
  //       `http://localhost:8000/api/book/${id}`,
  //       bookingData
  //     );

  //     if (bookingResponse.status === 200) {
  //       return true; // Возвращаем true, если резервирование прошло успешно
  //     } else {
  //       console.log("Booking failed");
  //       return false; // Возвращаем false, если резервирование не удалось
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Ошибка при резервировании номера");
  //     return false; // Возвращаем false в случае ошибки
  //   }
  // };

  // Функция для обработки отправки данных (резерв и оплата)
  // const onSubmit = async (stripeToken) => {
  //   try {
  //     const days = differenceInDays(
  //       new Date(state[0].endDate),
  //       new Date(state[0].startDate)
  //     );

  //     const calculatedTotalPrice = days * selectedRoom.price;
  //     setTotalPrice(calculatedTotalPrice);

  //     const bookingData = {
  //       ...data,
  //       room: selectedRoom._id,
  //       user: userId,
  //       start_time: state[0].startDate,
  //       end_time: state[0].endDate,
  //       total_price: calculatedTotalPrice,
  //     };

  //     const paymentResult = await processPayment(
  //       stripeToken,
  //       calculatedTotalPrice
  //     );
  //     if (paymentResult) {
  //       const bookingResult = await processBooking(bookingData, id);
  //       if (bookingResult) {
  //         handleResponse(true);
  //         console.log("Booking and payment successful");
  //         reset();
  //         setSelectedRoom(null);
  //         setSelectedHotel(null);
  //       } else {
  //         handleResponse(false);
  //       }
  //     } else {
  //       handleResponse(false);
  //     }
  //   } catch (error) {
  //     handleResponse(false);
  //     console.error(error);
  //     if (error.response && error.response.data) {
  //       console.log(error.response.data);
  //     }
  //   }
  // };

  // Функция для отправки запроса на бронирование
  const processBooking = async (bookingData, id) => {
    try {
      const bookingResponse = await axios.post(
        `http://localhost:8000/api/book/${id}`,
        bookingData
      );

      if (bookingResponse.status === 201) {
        return true; // Возвращаем true, если бронирование прошло успешно
      } else {
        console.log("Booking failed");
        return false; // Возвращаем false, если бронирование не удалось
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        // Если бронирование уже существует для данного номера и временного периода,
        // возвращаем ошибку с соответствующим сообщением
        toast.error("Bu oda belirtilen zaman aralığında zaten rezerve edilmiş");
      } else {
        // В случае других ошибок возвращаем общее сообщение об ошибке
        toast.error("1gun rezerv etmek mumkun deyil");
      }
      return false; // Возвращаем false в случае ошибки
    }
  };

  const processPayment = async (stripeToken, calculatedTotalPrice) => {
    try {
      const paymentResponse = await axios({
        url: "http://localhost:8000/payment",
        method: "post",
        data: {
          amount: calculatedTotalPrice * 100,
          token: stripeToken.id,
        },
      });

      if (paymentResponse.status === 200) {
        return true; // Возвращаем true, если оплата прошла успешно
      } else {
        console.log("Payment failed");
        return false; // Возвращаем false, если оплата не удалась
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при обработке платежа");
      return false; // Возвращаем false в случае ошибки
    }
  };

  // Функция для обработки бронирования
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

  // Функция для обработки оплаты
  // const handlePayment = async (stripeToken) => {
  //   try {
  //     const days = differenceInDays(
  //       new Date(state[0].endDate),
  //       new Date(state[0].startDate)
  //     );

  //     const calculatedTotalPrice = days * selectedRoom.price;
  //     setTotalPrice(calculatedTotalPrice);

  //     const paymentResult = await processPayment(
  //       stripeToken,
  //       calculatedTotalPrice
  //     );
  //     if (paymentResult) {
  //       handleResponse(true);
  //       console.log("Payment successful");
  //       reset();
  //       setSelectedRoom(null);
  //       setSelectedHotel(null);
  //     } else {
  //       handleResponse(false);
  //     }
  //   } catch (error) {
  //     handleResponse(false);
  //     console.error(error);
  //     if (error.response && error.response.data) {
  //       console.log(error.response.data);
  //     }
  //   }
  // };

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
                      <span className=" ">
                        <CiShare2 />
                      </span>
                    </div>
                    <div className="w-10 h-10   text-lg rounded-full  shadow-md border flex  justify-center items-center">
                      <span className=" ">
                        <CiHeart />
                      </span>
                    </div>
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
                        <span>
                          {" "}
                          The company continued to work at its regular pace. In
                          1972, the P250 Urraco, the 400 GT Jarama, the 400 GT
                          Espada and the P400 Miura SV were in full production.
                          That year, in an attempt to improve sales that were
                          frankly quite disappointing until then, the Jarama
                          hand a 365-hp engine and was dubbed the Jarama S.{" "}
                        </span>
                        <span>
                          {" "}
                          In 1972, the Urraco, which had experienced several
                          initial slowdowns, was finally put into production.
                          Almost inevitably, the S version also arrived in
                          October of that year. In this case, the goal was not
                          to enhance the car’s performance but to improve its
                          overall quality, which had been neglected in the haste
                          to start production.
                        </span>
                        <span>
                          {" "}
                          The following year, while waiting for the Countach
                          prototype to be developed to a stage that would enable
                          its production, the Espada was further modified and
                          perfected, and the new series was presented in October
                          1972. New wheels as well as perfected detailing of the
                          entire body, the dashboard, the central instrument
                          panel and various components characterised this
                          well-made Series III. This last series essentially
                          represented the decisive peak in the evolution of this
                          outstanding four-seater, which is still in great
                          demand among Lamborghini fans around the world. Its
                          production would reach the respectable figure of 1226
                          units, quite a large number for a carmaker of this
                          size selling at top-level list prices.
                        </span>
                        <span>
                          The production model of the Countach was codenamed LP
                          400 because its V12 – positioned longitudinally behind
                          the cockpit – was increased to an ideal displacement
                          of 4 litres (3929 cc). This model debuted at the 1973
                          Geneva Motor Show.
                        </span>
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
                      <button type="submit">SALAM</button>

                      {/* <StripeCheckout
                        stripeKey={publishableKey}
                        label="Pay Now"
                        name="Pay With Credit Card"
                        billingAddress
                        shippingAddress
                        description={`Your total is $${totalPrice}`}
                        amount={totalPrice * 100}
                        token={onSubmit} 
                      />*/}
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
                  </div>

                  <div>
                    <h1 className="font-bold text-2xl pb-5">Reviews</h1>
                    <div className=" py-10 w-1/2 rounded-lg bg-gray-50  border flex flex-col justify-center items-center">
                      <div className=" flex-col text-blue-500 [font-size:_clamp(1em,2vw,5em)] font-bold flex gap-3 items-center">
                        {data &&
                          data.reviews.map((comment) => (
                            <div className=" text-sm" key={comment._id}>
                              <p>{comment.comment}</p>
                              <p>{comment.ratings}</p>
                              {/* <p>{console.log(comment)}</p> */}
                            </div>
                          ))}
                      </div>
                      {/* <p className="text-center text-xl font-bold">Excellent</p>
                      <p className=" text-gray-600">(2 Reviews)</p> */}
                    </div>
                  </div>
                  <div>
                    <input className="border" type="text" name="" id="" />
                  </div>
                </div>

                <div className="  col-span-12 lg:col-span-4">
                  <MapStatic />
                  <div className=" border my-8 py-8 rounded-md">
                    <h5 className="  text-center w-6/12 mx-auto rounded-lg cursor-pointer  font-bold capitalize text-xl py-2  bg-blue-600 text-white ">
                      Inquiry
                    </h5>
                    <ContactForm />
                  </div>
                </div>
              </div>
              <div className="">
                {/* <div className="">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${days * data.cheapestPrice * roomCount}</b> ({days}{" "}
                    nights)
                  </h2>
                   <button onClick={() => updateRoomCount(roomCount + 1)}>
                    Increase Room Count
                  </button> 

                
                </div> */}
              </div>
            </div>
          </section>
        )
      )}
      <Featured />;
    </>
  );
};

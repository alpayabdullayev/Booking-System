import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "@/context/userContext";
import { FaCalendar, FaMoneyBill, FaUser } from "react-icons/fa";

const UserComponent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(UserContext);
  const [bookCount, setBookCount] = useState(0);
  const [totalBookingPrice, setTotalBookingPrice] = useState(0); // Toplam fiyat için state tanımla

  async function getAllUsers() {
    try {
      const res = await axios.get("http://localhost:8000/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("Token:", token);
    getAllUsers();
    getBookCount();
  }, [token]);

  async function getBookCount() {
    try {
      const res = await axios.get("http://localhost:8000/api/book/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookCount(res.data.length);
      calculateTotalBookingPrice(res.data); // Hesapla fonksiyonunu çağır
    } catch (error) {
      console.log(error);
    }
  }

  function calculateTotalBookingPrice(books) {
    let total = 0;
    books.forEach((book) => {
      total += book.total_price;
    });
    setTotalBookingPrice(total); // Toplam fiyatı güncelle
  }

  const breakpoint = 768;
  const usersCount = user ? user.length : 0;
  const displayUsersCount = window.innerWidth > breakpoint ? usersCount : "";
  const displayBookCount = window.innerWidth > breakpoint ? bookCount : "";

  return (
    <>
      <div className="flex justify-between items-center px-10 bg-white rounded-xl h-24">
        <div className="flex justify-center flex-col gap-2">
          <h1 className="text-xl font-bold text-gray-800">
            {displayUsersCount}
          </h1>
          <p className="text-sm text-gray-500">Users</p>
        </div>
        <div>
          <span className="text-4xl text-gray-400">
            <FaUser />
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center px-10 bg-white rounded-xl h-24">
        <div className="flex justify-center flex-col gap-2">
          <h1 className="text-xl font-bold text-gray-800">
            {displayBookCount}
          </h1>
          <p className="text-sm text-gray-500">Booking</p>
          <p className="text-sm text-gray-500">
            Total Price: {totalBookingPrice}$
          </p>
        </div>
        <div>
          <span className="text-4xl text-gray-400">
            <FaCalendar />
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center px-10  bg-blue-700  rounded-xl h-24">
        <div className="flex justify-center flex-col gap-2">
          <h1 className="text-xl font-bold text-white">${totalBookingPrice}</h1>
          <p className="text-sm text-white">Annual Income</p>
        </div>
        <div>
          <span className="text-4xl text-white">
            <FaMoneyBill />
          </span>
        </div>
      </div>
    </>
  );
};

export default UserComponent;

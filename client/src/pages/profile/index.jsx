import { UserContext } from "@/context/userContext";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

const Profile = () => {
  const { role, user, userT, userId } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getUserByID() {
    try {
      const res = await axios.get(`http://localhost:8000/api/user/${userId}`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserByID();
  }, []);

  return (
    <div className="mx-auto mt-10 p-6 w-full bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-10">
        <div className="mb-4">
          <img className="w-52 rounded-md" src={userT.avatar} alt="" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Hi, {user}</h1>

          <div>{console.log("salamdi", userT)}</div>
          <h2 className="text-lg font-semibold mb-2">
            <span className="text-gray-400">Email :</span> {userT.email}
          </h2>
          <h2 className="text-lg font-semibold mb-2">
            <span className="text-gray-400">Telephone Number :</span>{" "}
            {userT.phoneNumber}
          </h2>

          <h2 className="text-lg font-semibold mb-2">
            <span className="text-gray-400">Role :</span> {role}
          </h2>
        </div>
      </div>

      <div>
        <h1 className=" text-3xl font-bold pt-10 pb-5">Your Bookings</h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          data &&
          data.bookings.map((bookingItem) => (
            <div
              key={bookingItem._id}
              className="bg-gray-100 rounded-lg p-4 mb-4 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-2">
                {bookingItem.room.name}
              </h3>
              <img
                src={bookingItem.hotel.mainImage}
                className="w-full h-64 object-cover rounded-md mb-2"
                alt=""
              />
              <p className="text-sm text-gray-500 mb-1">
                Start Time: {bookingItem.start_time}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                End Time: {bookingItem.end_time}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Total Price: ${bookingItem.total_price}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Hotel: {bookingItem.hotel.name}
              </p>
              <p className="text-sm capitalize text-gray-500 mb-1">
                City: {bookingItem.hotel.city}
              </p>
              <p className="text-sm text-gray-500">
                Email: {bookingItem.user.email}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;

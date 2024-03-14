import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const HotelsUpdate = () => {
  const { id } = useParams();
  const [type, setType] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  console.log(selectedRooms);
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    title: "",
    desc: "",
    rating: 0,
    hotelStars: 0,
    cheapestPrice: 0,
    featured: false,
    mapAdress: "",
    languages: [],
    about: "",
    images: [],
    mainImage: null,
    // rooms: [],
  });

  async function getHotelById() {
    try {
      const res = await axios.get(`http://localhost:8000/api/find/${id}`);
      const hotelData = res.data;
      setHotel({
        name: hotelData.name,
        type: hotelData.type,
        city: hotelData.city,
        address: hotelData.address,
        distance: hotelData.distance,
        title: hotelData.title,
        desc: hotelData.desc,
        rating: hotelData.rating,
        hotelStars: hotelData.hotelStars,
        cheapestPrice: hotelData.cheapestPrice,
        featured: hotelData.featured,
        mapAddress: hotelData.mapAddress,
        languages: hotelData.languages,
        about: hotelData.about,
        images: hotelData.images,
        mainImage: hotelData.mainImage,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllTypes() {
    try {
      const res = await axios.get(`http://localhost:8000/api/hoteltype/`);
      setType(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTypes();
  }, []);

  async function getAllRooms() {
    try {
      const res = await axios.get(`http://localhost:8000/api/room/`);
      setDataRoom(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleRoomSelect = (roomId) => {
    setSelectedRooms((prevRooms) => {
      if (prevRooms.includes(roomId)) {
        return prevRooms.filter((r) => r !== roomId);
      } else {
        return [...prevRooms, roomId];
      }
    });
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  useEffect(() => {
    getHotelById();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotel((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleMainImageChange = (e) => {
    setHotel({ ...hotel, mainImage: e.target.files[0] || null });
  };

  const handleImagesChange = (e) => {
    setHotel({ ...hotel, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      console.log(formData.get("name"));

      for (let key in hotel) {
        if (key === "images") {
          for (let i = 0; i < hotel.images.length; i++) {
            formData.append("images", hotel.images[i]);
          }
        } else {
          console.log(key, hotel[key]);
          formData.append(key, hotel[key]);
        }
      }
      selectedRooms.forEach((x) => formData.append("rooms", x));
      selectedRooms.forEach((x) => console.log(x));

      console.log(formData.getAll("rooms"));
      await axios.put(`http://localhost:8000/api/hotels/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Hotel  Update oldu");
    } catch (error) {
      console.error("Hotel error:", error);
      toast.error("Hotel Update olmadi");
    }
  };

  return (
    <>
      <Dashboard />
      <div className=" flex">
        <div className="w-2/12"></div>
        <div className=" w-full  min-h-screen  bg-gray-200">
          <form
            onSubmit={handleSubmit}
            className="max-w-sm shadow-lg border py-10 px-14 bg-white mx-auto my-4"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={hotel.name}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
              <div className="mb-4">
                {dataRoom.map((room) => (
                  <div key={room._id}>
                    <label>
                      <input
                        type="checkbox"
                        // checked={selectedRooms.includes(room._id)}
                        onChange={(e) => handleRoomSelect(room._id, e)}
                        // value={room._id}
                      />
                      {room.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label htmlFor="rooms" className="block text-gray-700">
                  rooms:
                </label>
                {/* <input
                  type="text"
                  id="rooms"
                  name="rooms"
                  value={hotel.rooms}
                  onChange={handleInputChange}
                  className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                /> */}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Otel Tipi:</label>
              <select
                className="border w-full p-2"
                type="text"
                name="type"
                value={hotel.type}
                onChange={handleInputChange}
              >
                <option value="">Select a type...</option>
                {type.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700">
                city:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={hotel.city}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700">
                address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={hotel.address}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="distance" className="block text-gray-700">
                distance:
              </label>
              <input
                type="text"
                id="distance"
                name="distance"
                value={hotel.distance}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">
                title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={hotel.title}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="desc" className="block text-gray-700">
                desc:
              </label>
              <input
                type="text"
                id="desc"
                name="desc"
                value={hotel.desc}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-gray-700">
                rating:
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={hotel.rating}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="hotelStars" className="block text-gray-700">
                hotelStars:
              </label>
              <input
                type="number"
                id="hotelStars"
                name="hotelStars"
                value={hotel.hotelStars}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cheapestPrice" className="block text-gray-700">
                cheapestPrice:
              </label>
              <input
                type="number"
                id="cheapestPrice"
                name="cheapestPrice"
                value={hotel.cheapestPrice}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="featured" className="block text-gray-700">
                featured:
              </label>
              <input
                type="text"
                id="featured"
                name="featured"
                value={hotel.featured}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mapAdress" className="block text-gray-700">
                mapAdress:
              </label>
              <input
                type="text"
                id="mapAdress"
                name="mapAdress"
                value={hotel.mapAdress}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="languages" className="block text-gray-700">
                languages:
              </label>
              <input
                type="text"
                id="languages"
                name="languages"
                value={hotel.languages}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="about" className="block text-gray-700">
                about:
              </label>
              <input
                type="text"
                id="about"
                name="about"
                value={hotel.about}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mainImage" className="block text-gray-700">
                MainImage:
              </label>
              <input
                type="file"
                id="mainImage"
                name="mainImage"
                onChange={handleMainImageChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="images" className="block text-gray-700">
                images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleImagesChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Update Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HotelsUpdate;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import toast from "react-hot-toast";

const CreateRoom = () => {
  const [data, setData] = useState([]);

  const [roomData, setroomData] = useState({
    name: "",
    about: "",
    size: "",
    beds: "",
    maxPeople: "",
    children: "",
    price: "",
    images: [],
    mainImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setroomData({ ...roomData, [name]: value });
  };

  const handleMainImageChange = (e) => {
    setroomData({ ...roomData, mainImage: e.target.files[0] || null });
  };

  const handleImagesChange = (e) => {
    setroomData({ ...roomData, images: e.target.files });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in roomData) {
        if (key === "images") {
          for (let i = 0; i < roomData.images.length; i++) {
            formData.append("images", roomData.images[i]);
          }
        } else {
          formData.append(key, roomData[key]);
        }
      }

      await axios.post("http://localhost:8000/api/room/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("romm created")
    } catch (error) {
      console.error("room oluşturma hatası:", error);
      toast.error("An error occurred while creating room!");
    }
  };

  return (
    <>
      <Dashboard />
      <div className=" flex">
        <div className=" w-2/12"></div>
        <div className="w-full  min-h-screen bg-gray-200 ">
          <div className="w-6/12 mx-auto   ">
            <h2 className="text-2xl font-bold mb-4">Otel Oluştur</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Room Adı:
                </label>
                <input
                  className="border w-full p-2"
                  type="text"
                  name="name"
                  value={roomData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Price:</label>
                <input
                  className="border w-full p-2"
                  type="number"
                  name="price"
                  value={roomData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">about:</label>
                <input
                  className="border w-full p-2"
                  type="text"
                  name="about"
                  value={roomData.about}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">beds:</label>
                <input
                  className="border w-full p-2"
                  type="number"
                  name="beds"
                  value={roomData.beds}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">size:</label>
                <input
                  className="border w-full p-2"
                  type="number"
                  name="size"
                  value={roomData.size}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  children:
                </label>
                <input
                  className="border w-full p-2"
                  type="text"
                  name="children"
                  value={roomData.children}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  maxPeople:
                </label>
                <input
                  className="border w-full p-2"
                  type="number"
                  name="maxPeople"
                  value={roomData.maxPeople}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Ana Resim:
                </label>
                <input
                  className="border"
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Ek Resimler:
                </label>
                <input
                  className="border"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Room Oluştur
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;

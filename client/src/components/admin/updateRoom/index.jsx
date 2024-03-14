import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "../Dashboard";
import toast from "react-hot-toast";

const UpdateRoom = () => {
  const [data, setdata] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState({
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

  async function getRoomById() {
    try {
      const res = await axios.get(`http://localhost:8000/api/room/${id}`, {});
      const roomData = res.data;
      setRoom({
        name: roomData.name,
        about: roomData.about,
        size: roomData.size,
        beds: roomData.beds,
        maxPeople: roomData.maxPeople,
        children: roomData.children,
        price: roomData.price,
        images: roomData.images,
        mainImage: roomData.mainImage,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRoomById();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleMainImageChange = (e) => {
    setRoom({ ...room, mainImage: e.target.files[0] || null });
  };

  const handleImagesChange = (e) => {
    setRoom({ ...room, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in room) {
        if (key === "images") {
          for (let i = 0; i < room.images.length; i++) {
            formData.append("images", room.images[i]);
          }
        } else {
          formData.append(key, room[key]);
        }
      }

      await axios.put(`http://localhost:8000/api/room/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("The room has been updated successfully!");
      navigate("/admin/room");
    } catch (error) {
      console.error("Oda güncelleme hatası:", error);
      toast.error("An error occurred while updating the room!");
    }
  };
  return (
    <>
      <Dashboard />
      <div className="flex">
        <div className="w-2/12"></div>
        <div className=" bg-gray-200  flex-col flex justify-center items-center w-full min-h-screen">
          <h1 className=" text-3xl font-bold pb-10">Update Room Page</h1>

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
                value={room.name}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="about" className="block text-gray-700">
                about:
              </label>
              <input
                type="about"
                id="about"
                name="about"
                value={room.about}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="size" className="block text-gray-700">
                size:
              </label>
              <input
                type="size"
                id="size"
                name="size"
                value={room.size}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="beds" className="block text-gray-700">
                beds:
              </label>
              <input
                type="beds"
                id="beds"
                name="beds"
                value={room.beds}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="maxPeople" className="block text-gray-700">
                maxPeople:
              </label>
              <input
                type="maxPeople"
                id="maxPeople"
                name="maxPeople"
                value={room.maxPeople}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="children" className="block text-gray-700">
                children:
              </label>
              <input
                type="children"
                id="children"
                name="children"
                value={room.children}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700">
                price:
              </label>
              <input
                type="price"
                id="price"
                name="price"
                value={room.price}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mainImage" className="block text-gray-700">
                Ana Resim:
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
                Diğer Resimler:
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

export default UpdateRoom;

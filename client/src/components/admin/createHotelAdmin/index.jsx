import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "@/context/userContext";

const CreateHotelForm = () => {
  const [hotelData, setHotelData] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    title: "",
    desc: "",
    rating: 0,
    hotelStars: 0,
    rooms: [],
    cheapestPrice: 0,
    featured: false,
    mapAddress: "",
    languages: [],
    about: "",
  });
  const { token } = useContext(UserContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleImageChange = (event) => {
    setHotelData({ ...hotelData, mainImage: event.target.files[0] });
  };

  const handleMultipleImageChange = (event) => {
    setHotelData({ ...hotelData, images: event.target.files });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(hotelData).forEach(([key, value]) => {
        if (key === "images") {
          for (let i = 0; i < value.length; i++) {
            formData.append("images", value[i]);
          }
        } else {
          formData.append(key, value);
        }
      });

      await axios.post("http://localhost:8000/api/hotels", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      console.log("Otel oluşturuldu.");
    } catch (error) {
      console.error("Otel oluşturma hatası:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 my-10 rounded-md shadow-md">
      <h2 className="text-2xl mb-4">Otel Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Otel Adı:
            <input
              className="border py-2 px-3 mt-1 w-full"
              type="text"
              name="name"
              value={hotelData.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Otel Tipi:
            <input
              className="border py-2 px-3 mt-1 w-full"
              type="text"
              name="type"
              value={hotelData.type}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Şehir:
            <input
              className="border py-2 px-3 mt-1 w-full"
              type="text"
              name="city"
              value={hotelData.city}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Adres:
            <input
              className="border py-2 px-3 mt-1 w-full"
              type="text"
              name="address"
              value={hotelData.address}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Uzaklık:
            <input
              className="border py-2 px-3 mt-1 w-full"
              type="text"
              name="distance"
              value={hotelData.distance}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Başlık:
            <input
              className="border py-2 px-3 mt-1 w-full"
              type="text"
              name="title"
              value={hotelData.title}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Açıklama:
            <textarea
              className="border py-2 px-3 mt-1 w-full"
              name="desc"
              value={hotelData.desc}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Derecelendirme:
            <input
              className="border py-2 px-3 mt-1 w-full"
              type="number"
              name="rating"
              value={hotelData.rating}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Yıldız:
            <input
              className="border py-2 px-3 mt-1 w-full"
              type="number"
              name="hotelStars"
              value={hotelData.hotelStars}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ana Resim:
            <input
              className="border py-2 px-3 mt-1 w-full"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <label>
          rooms:
          <input
            className="border"
            type="text"
            name="rooms"
            value={hotelData.rooms}
            onChange={handleInputChange}
          />
        </label>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ek Resimler:
            <input
              className="border py-2 px-3 mt-1 w-full"
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleImageChange}
            />
          </label>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Otel Oluştur
        </button>
      </form>
    </div>
  );
};

export default CreateHotelForm;

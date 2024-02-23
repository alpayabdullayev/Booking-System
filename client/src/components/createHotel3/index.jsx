import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateHotelForm2 = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    rooms: "",
    cheapestPrice: 0,
    featured: false,
    mapAddress: "",
    languages: [],
    about: "",
    mainImage: null,
    images: [],
  });

  useEffect(() => {
    const getAllType = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/hoteltype/");
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getAllType();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleMainImageChange = (e) => {
    setHotelData({ ...hotelData, mainImage: e.target.files[0] });
  };

  const handleImagesChange = (e) => {
    setHotelData({ ...hotelData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in hotelData) {
        if (key === "images") {
          for (let i = 0; i < hotelData.images.length; i++) {
            formData.append("images", hotelData.images[i]);
          }
        } else {
          formData.append(key, hotelData[key]);
        }
      }

      await axios.post("http://localhost:8000/api/hotels/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Otel başarıyla oluşturuldu!");
    } catch (error) {
      console.error("Otel oluşturma hatası:", error);
      alert("Otel oluşturma sırasında bir hata oluştu!");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Otel Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Otel Adı:</label>
          <input
            className="border w-full p-2"
            type="text"
            name="name"
            value={hotelData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Cheapest Price:
          </label>
          <input
            className="border w-full p-2"
            type="text"
            name="cheapestPrice"
            value={hotelData.cheapestPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Otel Tipi:</label>
          <select
            className="border w-full p-2"
            type="text"
            name="type"
            value={hotelData.type}
            onChange={handleInputChange}
          >
            <option value="">Select a type...</option>
            {data.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Şehir:</label>
          <input
            className="border w-full p-2"
            type="text"
            name="city"
            value={hotelData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Adres:</label>
          <input
            className="border w-full p-2"
            type="text"
            name="address"
            value={hotelData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Rooms:</label>
          <input
            className="border w-full p-2"
            type="text"
            name="rooms"
            value={hotelData.rooms}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Uzaklık:</label>
          <input
            className="border w-full p-2"
            type="text"
            name="distance"
            value={hotelData.distance}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Başlık:</label>
          <input
            className="border w-full p-2"
            type="text"
            name="title"
            value={hotelData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Açıklama:</label>
          <textarea
            className="border w-full p-2"
            name="desc"
            value={hotelData.desc}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Derecelendirme:
          </label>
          <input
            className="border w-full p-2"
            type="number"
            name="rating"
            value={hotelData.rating}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Yıldız:</label>
          <input
            className="border w-full p-2"
            type="number"
            name="hotelStars"
            value={hotelData.hotelStars}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Ana Resim:</label>
          <input
            className="border"
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Ek Resimler:</label>
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
          Otel Oluştur
        </button>
      </form>
    </div>
  );
};

export default CreateHotelForm2;

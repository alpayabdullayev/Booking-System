import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../admin/Dashboard";
import toast from "react-hot-toast";

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
      toast.success("The hotel has been created successfully!");
    } catch (error) {
      console.error("Otel oluşturma hatası:", error);
      toast.error("An error occurred while creating the hotel!");
    }
  };

  return (
    <>
      <Dashboard />
      <div class="flex justify-center">
        <div className=" w-2/12"></div>{" "}
        <div class="w-10/12">
          <div class="bg-gray-100 p-10 rounded-lg shadow-md">
            <h2 class="text-3xl font-bold mb-8 text-center">Hotel Oluştur</h2>
            <form onSubmit={handleSubmit} class="space-y-6">
              <div>
                <label class="block text-sm font-semibold">Hotel Adı:</label>
                <input
                  class="border rounded w-full py-2 px-3"
                  type="text"
                  name="name"
                  value={hotelData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="block text-sm font-semibold">
                  Cheapest Price:
                </label>
                <input
                  class="border rounded w-full py-2 px-3"
                  type="text"
                  name="cheapestPrice"
                  value={hotelData.cheapestPrice}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="block text-sm font-semibold">Otel Tipi:</label>
                <select
                  class="border rounded w-full py-2 px-3"
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
              <div>
                <label class="block text-sm font-semibold">Şehir:</label>
                <input
                  class="border rounded w-full py-2 px-3"
                  type="text"
                  name="city"
                  value={hotelData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="block text-sm font-semibold">Adres:</label>
                <input
                  class="border rounded w-full py-2 px-3"
                  type="text"
                  name="address"
                  value={hotelData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="block text-sm font-semibold">Rooms:</label>
                <input
                  class="border rounded w-full py-2 px-3"
                  type="text"
                  name="rooms"
                  value={hotelData.rooms}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="block text-sm font-semibold">Uzaklık:</label>
                <input
                  class="border rounded w-full py-2 px-3"
                  type="text"
                  name="distance"
                  value={hotelData.distance}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="block text-sm font-semibold">Başlık:</label>
                <input
                  class="border rounded w-full py-2 px-3"
                  type="text"
                  name="title"
                  value={hotelData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="block text-sm font-semibold">Açıklama:</label>
                <textarea
                  class="border rounded w-full py-2 px-3"
                  name="desc"
                  value={hotelData.desc}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-semibold">
                  Derecelendirme:
                </label>
                <input
                  class="border rounded w-full py-2 px-3"
                  type="number"
                  name="rating"
                  value={hotelData.rating}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="block text-sm font-semibold">Ulduz:</label>
                <input
                  class="border rounded w-full py-2 px-3"
                  type="number"
                  name="hotelStars"
                  value={hotelData.hotelStars}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="block text-sm font-semibold">Ana Resim:</label>
                <input
                  class="border"
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                />
              </div>
              <div>
                <label class="block text-sm font-semibold">Ek Resimler:</label>
                <input
                  class="border"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-block"
                >
                  Otel Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateHotelForm2;

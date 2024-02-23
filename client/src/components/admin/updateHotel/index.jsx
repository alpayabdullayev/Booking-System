import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateHotelForm = () => {
  const { id } = useParams();
  const [dataType, setDataType] = useState([]);
  const [roomData, setRoomData] = useState([]);
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
    cheapestPrice: 0,
    featured: false,
    mapAddress: "",
    languages: [],
    about: "",
    mainImage: null,
    images: [],
    rooms: [],
    // rooms: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typeRes, hotelRes, roomRes] = await Promise.all([
          axios.get("http://localhost:8000/api/hoteltype/"),
          axios.get(`http://localhost:8000/api/find/${id}`),
          axios.get("http://localhost:8000/api/room/"),
        ]);
        setDataType(typeRes.data);
        setHotelData(hotelRes.data);
        setRoomData(roomRes.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
      const selectedType = dataType.find((type) => type._id === value);
      setHotelData({ ...hotelData, [name]: selectedType });
    } else {
      setHotelData({ ...hotelData, [name]: value });
    }
  };

  const handleMainImageChange = (e) => {
    setHotelData({ ...hotelData, mainImage: e.target.files[0] });
  };

  const handleImagesChange = (e) => {
    setHotelData({ ...hotelData, images: e.target.files });
  };

  // handleRoomSelection fonksiyonunu güncelleyin
  const handleRoomSelection = (e) => {
    const roomId = e.target.value;
    const isChecked = e.target.checked;

    if (!roomId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log(`Invalid roomId: ${roomId}`);
      return;
    }

    setHotelData((prevState) => {
      if (isChecked) {
        return { ...prevState, rooms: [...prevState.rooms, roomId] };
      } else {
        return {
          ...prevState,
          rooms: prevState.rooms.filter((room) => room !== roomId),
        };
      }
    });
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
        } else if (key === "rooms") {
          hotelData.rooms.forEach((roomId) => {
            formData.append("rooms", roomId);
          });
        } else {
          formData.append(key, hotelData[key]);
        }
      }
      console.log(formData, "sadfgh");
      // await axios.put(
      //   `http://localhost:8000/api/hotels/${hotelData._id}`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      alert("Otel başarıyla güncellendi!");
    } catch (error) {
      console.error("Otel güncelleme hatası:", error);
      alert("Otel güncelleme sırasında bir hata oluştu!");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Otel Güncelle</h2>
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
        {/* <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Rooms:</label>
          <input
            className="border w-full p-2"
            type="text"
            name="cheapestPrice"
            value={hotelData.rooms}
            onChange={handleInputChange}
          />
        </div> */}
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
            {dataType.map((type) => (
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
          <label className="block text-sm font-bold mb-2">Odalar:</label>
          {roomData.map((room) => (
            <div key={room._id} className="flex items-center">
              <input
                type="checkbox"
                name={room.name}
                value={room._id}
                checked={hotelData.rooms[room._id]}
                onChange={handleRoomSelection}
              />
              <label htmlFor={room.name} className="ml-2">
                {room.name}
              </label>
            </div>
          ))}
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
          Otel Güncelle
        </button>
      </form>
    </div>
  );
};

export default UpdateHotelForm;

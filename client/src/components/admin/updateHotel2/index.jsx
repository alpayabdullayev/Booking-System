import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateHotel2 = ({ hotelId }) => {
  const [hotelData, setHotelData] = useState({
    name: "",
    city: "",
    address: "",
    distance: "",
    mainImage: null,
    images: [],
    title: "",
    desc: "",
    rating: 0,
    hotelStars: 0,
    rooms: [],
    cheapestPrice: 0,
    featured: false,
    reviews: [],
    mapAddress: "",
    languages: [],
    about: "",
  });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`/hotels/${hotelId}`);
        setHotelData(response.data);
      } catch (error) {
        console.error("Error fetching hotel:", error);
        setHotelData({
          name: "",
          city: "",
          address: "",
          distance: "",
          mainImage: null,
          images: [],
          title: "",
          desc: "",
          rating: 0,
          hotelStars: 0,
          rooms: [],
          cheapestPrice: 0,
          featured: false,
          reviews: [],
          mapAddress: "",
          languages: [],
          about: "",
        });
      }
    };
    fetchHotel();
  }, [hotelId]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setHotelData({ ...hotelData, [e.target.name]: e.target.files[0] });
    } else {
      setHotelData({ ...hotelData, [e.target.name]: e.target.value });
    }
  };

  const handleRoomChange = (index, value) => {
    const newRooms = [...hotelData.rooms];
    newRooms[index] = value;
    setHotelData({ ...hotelData, rooms: newRooms });
  };

  const addRoom = () => {
    setHotelData({ ...hotelData, rooms: [...hotelData.rooms, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in hotelData) {
        if (key === "rooms") {
          hotelData[key].forEach((room, index) => {
            formDataToSend.append(`${key}[${index}]`, room);
          });
        } else {
          formDataToSend.append(key, hotelData[key]);
        }
      }
      const response = await axios.put(`/hotels/${hotelId}`, formDataToSend);
      console.log(response.data); 
  
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          className="border"
          type="text"
          name="name"
          value={hotelData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        City:
        <input
          className="border"
          type="text"
          name="city"
          value={hotelData.city}
          onChange={handleChange}
        />
      </label>
      <label>
        Address:
        <input
          className="border"
          type="text"
          name="address"
          value={hotelData.address}
          onChange={handleChange}
        />
      </label>
      <label>
        Distance:
        <input
          className="border"
          type="text"
          name="distance"
          value={hotelData.distance}
          onChange={handleChange}
        />
      </label>
      <label>
        Main Image:
        <input
          className="border"
          type="file"
          name="mainImage"
          onChange={handleChange}
        />
      </label>
      <label>
        Images:
        <input
          className="border"
          type="file"
          name="images"
          multiple
          onChange={handleChange}
        />
      </label>
      <label>
        Title:
        <input
          className="border"
          type="text"
          name="title"
          value={hotelData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea name="desc" value={hotelData.desc} onChange={handleChange} />
      </label>
      <label>
        Rating:
        <input
          className="border"
          type="number"
          name="rating"
          value={hotelData.rating}
          onChange={handleChange}
        />
      </label>
      <label>
        Hotel Stars:
        <input
          className="border"
          type="number"
          name="hotelStars"
          value={hotelData.hotelStars}
          onChange={handleChange}
        />
      </label>
      <label>
        Cheapest Price:
        <input
          className="border"
          type="number"
          name="cheapestPrice"
          value={hotelData.cheapestPrice}
          onChange={handleChange}
        />
      </label>
      <label>
        Featured:
        <input
          className="border"
          type="checkbox"
          name="featured"
          checked={hotelData.featured}
          onChange={handleChange}
        />
      </label>
      <label>
        Map Address:
        <input
          className="border"
          type="text"
          name="mapAddress"
          value={hotelData.mapAddress}
          onChange={handleChange}
        />
      </label>
      <label>
        Languages:
        <input
          className="border"
          type="text"
          name="languages"
          value={hotelData.languages}
          onChange={handleChange}
        />
      </label>
      <label>
        About:
        <textarea
          name="about"
          value={hotelData.about}
          onChange={handleChange}
        />
      </label>
      <h2>Rooms</h2>
      {hotelData.rooms &&
        hotelData.rooms.map((room, index) => (
          <div key={index}>
            <input
              className="border"
              type="text"
              value={room}
              onChange={(e) => handleRoomChange(index, e.target.value)}
              placeholder={`Room ${index + 1}`}
            />
          </div>
        ))}
      <button type="button" onClick={addRoom}>
        Add Room
      </button>
      <button type="submit">Update Hotel</button>
    </form>
  );
};

export default UpdateHotel2;

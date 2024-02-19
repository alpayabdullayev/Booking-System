import { SearchContext } from "@/context/SearchContext";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Reserve = ({ hotelId, setOpen }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function getHotelsRoom() {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/hotels/room/${hotelId}`
        );
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getHotelsRoom();
  }, [hotelId]);

  

  useEffect(() => {
    let price = 0;
    selectedRooms.forEach((room) => {
      price += room.price;
    });
    setTotalPrice(price);
  }, [selectedRooms]);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates =
    dates && dates.length > 0
      ? getDatesInRange(dates[0].startDate, dates[0].endDate)
      : [];

  const calculateRoomPrice = (roomNumber) => {
    const dailyPrice = roomNumber.dailyPrice;
    const days = alldates.length;
    return dailyPrice * days;
  };

  const handleSelect = (e) => {
    const { checked, value } = e.target;
    const roomNumber = data
      .flatMap((item) => item.roomNumbers)
      .find((room) => room._id === value);

    if (!roomNumber) {
      console.error("Room not found.");
      return;
    }

    const roomPrice = calculateRoomPrice(roomNumber); // Seçilen odanın günlük fiyatını hesapla

    setSelectedRooms((prevSelectedRooms) => {
      const updatedRooms = checked
        ? [...prevSelectedRooms, { id: value, price: roomPrice }] // Odanın fiyatını ekleyin, günlük fiyat üzerinden toplam fiyatı eklemeyin
        : prevSelectedRooms.filter((item) => item.id !== value);

      // Tüm seçilen odaların fiyatlarını topla
      const newTotalPrice = updatedRooms.reduce(
        (acc, room) => acc + room.price,
        0
      );

      setTotalPrice(newTotalPrice); // Toplam fiyatı güncelle
      return updatedRooms;
    });
  };

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const {userId} = useContext(UserContext)

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(async (room) => {
          const res = await axios.put(
            `http://localhost:8000/api/rooms/availability/${room.id}`,
            {
              userId,
              dates: alldates,
        
            }
          );
          return res;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section>
        <div>
          <div className="wrapper">
            <div>
              <span>
                <FaTimes onClick={() => setOpen(false)} />
              </span>
            </div>
            <div>
              <span>Select Your Room</span>
              <div>
                {isLoading ? (
                  <p>loading...</p>
                ) : (
                  data &&
                  data.map((item) => (
                    <div key={item._id}>
                      <div>
                        <h1>{item.title}</h1>
                        <h1>{item.desc}</h1>
                        <h5>
                          Max people: <b>{item.maxPeople}</b>
                        </h5>
                        <p>{item.price}$</p>
                      </div>
                      <div>
                        {item.roomNumbers.map((roomNumber) => (
                          <div className="room" key={roomNumber._id}>
                            <label>{roomNumber.number}</label>
                            <input
                              type="checkbox"
                              value={roomNumber._id}
                              onChange={handleSelect}
                              disabled={!isAvailable(roomNumber)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
                <h3>Total Price: ${totalPrice}</h3>
                <button onClick={handleClick} className="py-2 px-2 bg-blue-600">
                  Reserve Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reserve;

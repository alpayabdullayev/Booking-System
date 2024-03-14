import React, { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "./userContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [basket, setBasket] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useContext(UserContext);
  const [products, setProducts] = useState(null);
  // const navigate = useNavigate();

  const [bookingData, setBookingData] = useState(null);

  const saveBookingData = (data) => {
    setBookingData(data);
  };

  async function handleAddToWishlist(hotelId) {
    try {
      if (!token) {
        console.log("Token yok");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await axios.post(
        `http://localhost:8000/api/users/${userId}/wishlist`,
        { hotelId: hotelId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data || !response.data.user) {
        throw new Error("Wishlist bilgileri alınamadı.");
      }

      toast.success("Successful");

      console.log("Wishlist güncellendi:", response.data);
      setWishlist([...wishlist,{...response.data.user.wishlist}])
    } catch (error) {
      console.error("Wishlist güncellenirken hata oluştu:", error.message);
      setError(error.message);
    }
  }

  async function fetchWishlist() {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const res = await axios.get(`http://localhost:8000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(res.data.wishlist);
    } catch (error) {
      setError("Error fetching wishlist: " + error.message);
    }
  }

  const data = {
    handleAddToWishlist,
    bookingData,
    saveBookingData,
    fetchWishlist,
    wishlist,
    setWishlist
  };
  return (
    <>
      <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
    </>
  );
};

export default GlobalProvider;

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

  async function handleAddToWishlist(hotelId) {
    try {
      if (!token) {
        console.log("Token yoxdu");
        // navigate("/login");

        return;
      }

      const decodedToken = jwtDecode(token);
      console.log("decodedToken", decodedToken);
      const userId = decodedToken.userId;

      const response = await axios.post(
        `http://localhost:8000/api/users/${userId}/wishlist`,
        {
          hotelId: hotelId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Successfully");

      console.log("Wishlist updated:", response.data);
      setWishlist(response.data.user.wishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error.message);
    }
  }

  async function fetchWishlist() {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      // console.log("userId : ", userId);
      const res = await axios.get(`http://localhost:8000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(res.data.wishlist);
    } catch (error) {
      setError("Error fetching products: " + error.message);
    }
    // finally {
    //   setLoading(false);
    // }
  }

  const data = { handleAddToWishlist, fetchWishlist, wishlist };
  return (
    <>
      <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
    </>
  );
};

export default GlobalProvider;

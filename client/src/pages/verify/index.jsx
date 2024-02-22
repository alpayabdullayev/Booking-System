import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Verify = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token')
  useEffect(() => {
    if (token) {
      postdu(token);
    }
  }, [token]);

  async function postdu(token) {
    try {
      const res = await axios.post("http://localhost:8000/api/verify", { token });
      console.log("Response:", res.data); 
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  return <div className=" min-h-screen">Verify</div>;
};

export default Verify;

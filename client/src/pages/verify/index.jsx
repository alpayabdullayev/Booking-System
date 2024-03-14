import axios from "axios";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";

const Verify = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  console.log("ehmed", token);
  useEffect(() => {
    if (token) {
      postdu(token);
    }
  }, [token]);

  async function postdu(token) {
    try {
      console.log("axaxaxa", token);
      const res = await axios.post(
        `http://localhost:8000/api/verify?token=${token}`
      );
      console.log("Response:", res.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  return (
    <div className=" min-h-screen w-full ">
      <div className=" flex  flex-col flex-wrap justify-center items-center gap-4  min-h-[80vh] ">
        <span className="text-blue-600 text-3xl">
          <MdMarkEmailRead />
        </span>
        <h1 className=" text-5xl text-blue-600 font-bold">
          Verify your email address
        </h1>
        <div>
          <button className=" py-2 px-2 bg-blue-600 text-white rounded-lg">
            <Link to={"/login"}>Go To Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;

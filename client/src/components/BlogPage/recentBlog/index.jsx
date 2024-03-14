import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HashLoader } from "react-spinners";

const RecentPost = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllBlogs() {
    try {
      const res = await axios.get("http://localhost:8000/api/blogs/");

      setData(res.data.slice(-4).reverse());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  return (
    <div className="bg-gray-100 px-10 shadow-md py-10 rounded-lg">
      <h1 className="text-3xl font-semibold pb-5">Recent Post</h1>
      <div className="grid grid-cols-1 gap-8 items-center">
        {isLoading ? (
          <div className="flex justify-center w-full  items-center ">
            <HashLoader color="#183ee7" />
          </div>
        ) : (
          data &&
          data.map((item) => (
            <div key={item._id} className="cursor-pointer group flex gap-4">
              <div>
                {item.images.length > 0 && (
                  <img
                    src={item.images[0]}
                    className="rounded-full object-cover w-14 h-14"
                    alt=""
                  />
                )}
              </div>
              <div>
                <NavLink to={`/blogs/${item?._id}`}>
                  <h3 className="font-bold text-lg group-hover:text-blue-600 duration-300">
                    {item.title}
                  </h3>
                </NavLink>
                <h6 className="text-gray-600">{formatDate(item.createdAt)}</h6>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentPost;

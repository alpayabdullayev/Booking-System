import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ item }) => {
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
    <>
      <div className=" cursor-pointer rounded-lg shadow-md group">
        <div className="rounded-t-md overflow-hidden">
          <Link to={`/blogs/${item?._id}`}>
            <img
              src={item?.images}
              className="w-full object-cover max-h-[500px] rounded-t-md group-hover:scale-105 duration-300"
              alt=""
            />
          </Link>
        </div>
        <div className="flex flex-col gap-4 py-10 px-10 rounded-md">
          <div>
            <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1  ring-inset ring-green-600/20">
              {item?.status}
            </span>
          </div>
          <h2 className="text-2xl font-bold hover:text-blue-600 duration-200">
            {item?.title}
          </h2>
          <p className=" text-gray-600">{item?.text}</p>
          <div className="rounded-md items-center flex gap-5">
            <div className="rounded-full">
              <img
                src={item?.user?.avatar}
                alt=""
                className="rounded-full w-14 h-14 object-cover"
              />
            </div>
            <div className="flex gap-2">
              <h5>
                BY{" "}
                <span className=" font-bold hover:text-blue-600 duration-200">
                  {item?.user?.username}
                </span>
              </h5>
              <span>|</span>
              {/* <p>April 6, 2022 10:20 AM</p> */}
              <p>{formatDate(item?.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;

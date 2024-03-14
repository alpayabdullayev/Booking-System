import React from "react";
import { Link } from "react-router-dom";

const AddYourBlog = () => {
  return (
    <>
      <div className=" flex flex-col gap-4 shadow-md rounded-lg py-5 px-5 bg-gray-50">
        <h3 className=" text-xl font-bold">Add Your Blog?</h3>
        <div className=" min-h-[2px] w-full bg-gray-300  "></div>
        <div>
          <Link to={"/createblog"}>
            <button className=" py-2 w-full px-4 bg-blue-600 text-white rounded-md">
              Add
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddYourBlog;

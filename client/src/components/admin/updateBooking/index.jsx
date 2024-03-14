import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../Dashboard";
import toast from "react-hot-toast";

const UpdateBooking = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    status: "",
  });

  async function getBookById() {
    try {
      const res = await axios.get(`http://localhost:8000/api/book/${id}`, {});
      const bookData = res.data;
      setBook({
        status: bookData.status,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBookById();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/book/${id}/status`, {
        status: book.status,
      });
      toast.success("Booking başarıyla güncellendi!");
    } catch (error) {
      console.error("Booking güncelleme hatası:", error);
      toast.error("Booking güncelleme sırasında bir hata oluştu!");
    }
  };
  return (
    <>
      <Dashboard />
      <div className="flex">
        <div className="w-2/12"></div>
        <div className=" bg-gray-200  flex-col flex justify-center items-center w-full min-h-screen">
          <h1 className=" text-3xl font-bold pb-10">Update Room Page</h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-sm shadow-lg border py-10 px-14 bg-white mx-auto my-4"
          >
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700">
                Status:
              </label>
              <input
                type="text"
                id="status"
                name="status"
                value={book.status}
                onChange={handleInputChange}
                className="border w-full px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Update Room
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateBooking;

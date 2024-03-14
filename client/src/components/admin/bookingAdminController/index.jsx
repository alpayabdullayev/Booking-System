import { UserContext } from "@/context/userContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
// import { RiUpdateFill } from "react-icons/ri"; // Değiştirilmiş import
import { GrUpdate } from "react-icons/gr";
import { HashLoader } from "react-spinners";

const BookAdminController = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;

  async function getAllBooking() {
    try {
      const res = await axios.get("http://localhost:8000/api/book/");
      setBook(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("Token:", token);
    getAllBooking();
  }, [token]);

  useEffect(() => {
    setTotalPages(Math.ceil(book?.length / perPage));
  }, [book, perPage]);

  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const subset = book?.slice(startIndex, endIndex) || [];

  async function bookingDelete(bookId) {
    try {
      await axios.delete(`http://localhost:8000/api/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedBook = book?.filter((item) => item._id !== bookId);
      setBook(updatedBook);
    } catch (error) {
      console.log(error);
    }
  }

  function navigateUpdate(bookId) {
    navigate(`/admin/book/${bookId}/update`);
  }

  return (
    <>
      <Dashboard />
      <div className="px-10 py-3 flex">
        <div className="w-2/12"></div>
        <main className="w-full min-h-screen bg-gray-200 px-20 ">
          <div className="flex py-5 items-center justify-between flex-wrap">
            <div className="flex flex-wrap gap-4 py-5"></div>
          </div>
          <div className="overflow-auto">
            <table className="border rounded-md w-full border-solid border-gray-300">
              <thead className="">
                <tr className="text-left">
                  <th className="py-2 px-4 border border-gray-300 text-gray">
                    Start Time
                  </th>
                  <th className="py-2 px-4 border border-gray-300">End Time</th>
                  <th className="py-2 px-4 border border-gray-300">
                    Hotel Name
                  </th>
                  <th className="py-2 px-4 border border-gray-300">
                    Room Name
                  </th>
                  <th className="py-2 px-4 border border-gray-300">Status</th>
                  <th className="py-2 px-4 border border-gray-300 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <div className="flex justify-center w-full  items-center ">
                      <HashLoader color="#183ee7" />
                    </div>
                  </tr>
                ) : (
                  subset.map((item) => (
                    <tr key={item._id}>
                      <td className="py-2 px-4 border border-gray-300">
                        {item.start_time}
                      </td>
                      <td className="py-2 capitalize px-4 border border-gray-300">
                        {item.end_time}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {item.hotel ? item.hotel.name : "N/A"}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {item.room ? item.room.name : "N/A"}
                      </td>
                      <td className="py-2 capitalize px-4 border border-gray-300">
                        {item.status}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {" "}
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded-md mr-2"
                          onClick={() => bookingDelete(item._id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="bg-blue-500 text-white py-1 px-2 rounded-md"
                          onClick={() => navigateUpdate(item._id)}
                        >
                          {/* <RiUpdateFill /> */}
                          <GrUpdate />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="pagination">
              <ReactPaginate
                className="flex gap-4 py-8  mt-3  px-6"
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => setCurrentPage(e.selected)}
                pageCount={totalPages}
                previousLabel="< "
                forcePage={currentPage}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BookAdminController;

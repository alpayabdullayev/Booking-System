import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../BlogCard";
import ReactPaginate from "react-paginate";
import BlogCardSkeleton from "../BlogCardSkeleton";

const GetAllBlog = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 3;

  async function GetAllBlogs() {
    try {
      const res = await axios.get("http://localhost:8000/api/blogs/");
      setData(res.data.reverse());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetAllBlogs();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(data?.length / perPage));
  }, [data, perPage]);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const subset = data?.slice(startIndex, endIndex) || [];

  const handlePageChange = async (selectedPage) => {
    setIsLoading(true);
    setCurrentPage(selectedPage);

    try {
      const res = await axios.get("http://localhost:8000/api/blogs");
      setData(res.data.reverse());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <BlogCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12">
          {subset.map((item) => (
            <BlogCard key={item.id} item={item} />
          ))}
          <div className="flex justify-center items-center">
            <ReactPaginate
              className="flex gap-4 py-8 mt-3 px-6"
              breakLabel="..."
              nextLabel=">"
              onPageChange={(e) => handlePageChange(e.selected)}
              pageCount={totalPages}
              previousLabel="< "
              forcePage={currentPage}
              activeClassName="bg-blue-500 text-white px-2 py-2 rounded"
              pageClassName="px-2 py-2"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GetAllBlog;

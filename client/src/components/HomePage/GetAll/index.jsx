import React, { useEffect, useState } from "react";
import SectionTitle from "../../common/sectionTitle";
import axios from "axios";
import MainCardSkeleton from "@/components/common/mainCardSkeleton";
import MainCard from "@/components/common/mainCard";

const GetAll = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getAll() {
    try {
      const res = await axios.get("http://localhost:8000/api/hotels");
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <section className="py-20 min-h-screen bg-gray-100">
        <div className="wrapper">
          <SectionTitle children={"Get inspired for your next trip"} />
          <div className="py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
              {isLoading ? (
                <>
                  <MainCardSkeleton />
                  <MainCardSkeleton />
                  <MainCardSkeleton />
                </>
              ) : (
                data &&
                data.map((item, index) => <MainCard key={index} item={item} />)
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetAll;

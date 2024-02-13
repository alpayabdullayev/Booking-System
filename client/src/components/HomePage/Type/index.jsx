import axios from "axios";
import React, { useEffect, useState } from "react";
import SectionTitle from "../../common/sectionTitle";
import { Link } from "react-router-dom";

const Type = () => {
  const [data, setdata] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  async function getAll() {
    try {
      const res = await axios.get("http://localhost:8000/api/hoteltype/");
      setdata(res.data);
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
      <section className="py-20">
        <div className="wrapper">
          <SectionTitle children={"Browse by property type"} />
          <div className="py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
              {IsLoading ? (
                <p>Loading...</p>
              ) : (
                data &&
                data.map((item, i) => (
                  <div className="group ">
                    <div className="rounded-lg overflow-hidden relative">
                      <Link key={item._id} to={`/types/${item._id}`}>
                        {" "}
                        <img
                          src={item.image}
                          alt=""
                          className=" h-60 w-full  object-cover  group-hover:scale-105 duration-300"
                        />
                      </Link>
                    </div>
                    <div className="text-center py-2">
                      <h1 className="  font-semibold group-hover:text-blue-600 duration-200   capitalize">
                        {item.name}
                      </h1>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Type;

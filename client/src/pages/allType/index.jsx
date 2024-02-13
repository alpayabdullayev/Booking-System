import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionTitle from "../../components/common/sectionTitle";
import SearchItem from "@/components/SearchItems";

const TypeDetail = () => {
  const { typeId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllType() {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/hotels/type/${typeId}`
      );
      setData(res.data || []);
      //   console.log(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllType();
  }, []);

  return (
    <section className="py-10">
      <div className="wrapper">
        <SectionTitle children={`Hotels of Type`} />
        {isLoading ? (
          <p className="text-red-500">Loading...</p>
        ) : (
          <div className="py-10">
            <div className="">
              {data.length > 0 ? (
                data.map((item) => (
                  <SearchItem item={item} {...item} key={item._id} />
                ))
              ) : (
                <p>No hotels found for this type.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TypeDetail;

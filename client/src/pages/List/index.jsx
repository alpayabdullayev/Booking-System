import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/SearchItems";
import axios from "axios";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state?.destination || ""
  );
  const [dates, setDates] = useState(location.state?.dates || "");
  const [options, setOptions] = useState(location.state?.options || []);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const [data, setdata] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  async function getAll() {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/hotels?city=${destination}`
      );
      setdata(res.data);
      setIsLoading(false);
      console.log(destination);
    } catch (error) {
      console.log("Error fetching data:", error.message);

    }
  }


  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <div className="">
        <div className="">
          <div className="">
            {IsLoading ? (
              <div className="">Loading...</div>
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} {...item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

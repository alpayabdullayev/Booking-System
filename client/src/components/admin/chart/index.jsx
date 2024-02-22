import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Charti = () => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const cityCounts = {};

  data.forEach((hotel) => {
    const city = hotel.city;
    if (cityCounts[city]) {
      cityCounts[city] += 1;
    } else {
      cityCounts[city] = 1;
    }
  });

  const chartData = {
    labels: Object.keys(cityCounts),
    datasets: [
      {
        data: Object.values(cityCounts),
        backgroundColor: ["#34D399", "#8B5CF6", "#3B82F6"],
      },
    ],
  };

  return (
    <div>
      <div className="">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default Charti;

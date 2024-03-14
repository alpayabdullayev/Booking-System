import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import moment from "moment";

const BarChartdi = () => {
  const [data, setData] = useState(null);
  const [processedData, setProcessedData] = useState([]);

  async function GetAllBooking() {
    try {
      const res = await axios.get("http://localhost:8000/api/room/");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetAllBooking();
  }, []);

  useEffect(() => {
    if (data) {
      const groupedData = groupDataByDate(data);
      setProcessedData(groupedData);
    }
  }, [data]);

  const groupDataByDate = (data) => {
    const grouped = {};
    data.forEach((booking) => {
      const date = moment(booking.createAt).format("YYYY-MM-DD");
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(booking);
    });

    return Object.entries(grouped).map(([date, bookings]) => ({
      date,
      count: bookings.length,
    }));
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <p className=" text-center font-bold text-lg">Rooms Count</p>
      <BarChart data={processedData}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartdi;

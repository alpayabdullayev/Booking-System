import { UserContext } from "@/context/userContext";
import React, { useContext } from "react";
import Charti from "../chart";
import UserGraph from "../chart/Cpu";
import MapChart from "@/components/AboutPage/MapChart";
import MapStatic from "@/components/AboutPage/map";
// import BarChart from "../chart/BarChart";
import BarChartdi from "../chart/BarChart";

const Overview = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex ">
      <div className="w-2/12"></div>
      <div className="py-10 bg-gray-300 min-h-screen w-full">
        <h1 className="text-3xl px-6 font-bold ">Hi, {user} 👋</h1>
        <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3  gap-10  px-5 py-10">
          <UserGraph />
          <Charti />
          <BarChartdi />
          <MapStatic />
        </div>
      </div>
    </div>
  );
};

export default Overview;

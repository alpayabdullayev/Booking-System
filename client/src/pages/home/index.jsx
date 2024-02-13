import React from "react";
import TopDestinations from "../../components/HomePage/TopDestinations";
import Header from "../../components/header";
import GetAll from "../../components/HomePage/GetAll";
import Type from "../../components/HomePage/Type";
import Featured from "../../components/HomePage/featured";
import Sub from "@/components/common/sub";

const Home = () => {
  return (
    <>
      <main>
        <Header />
        <TopDestinations />
        <GetAll />
        <Type />
        <Featured />
        <Sub />
      </main>
    </>
  );
};

export default Home;

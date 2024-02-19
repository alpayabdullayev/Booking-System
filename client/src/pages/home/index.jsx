import React from "react";
import TopDestinations from "../../components/HomePage/TopDestinations";
import Header from "../../components/header";
import GetAll from "../../components/HomePage/GetAll";
import Type from "../../components/HomePage/Type";
import Featured from "../../components/HomePage/featured";
import Sub from "@/components/common/sub";
import HorizontalSection from "@/components/HomePage/HorizontalSection";
import Banner from "@/components/common/banner";
import WishlistSection from "@/components/wishlist";

const Home = () => {
  return (
    <>
      <main>
        <Header />
        <Banner />
        <TopDestinations />
        <GetAll />
        <WishlistSection />
        <Type />
        <HorizontalSection />
        <Featured />
        <Sub />
      </main>
    </>
  );
};

export default Home;

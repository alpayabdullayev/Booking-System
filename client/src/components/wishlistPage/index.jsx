import React from "react";
import SectionTitle from "../common/sectionTitle";
import WishlistSection from "../wishlist";

const WishlistPageContent = () => {
  return (
    <>
      <section className="min-h-screen">
        <div className="wrapper">
          <SectionTitle children={"Your Favorite Hotels"} />
          <WishlistSection />
        </div>
      </section>
    </>
  );
};

export default WishlistPageContent;

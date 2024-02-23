import React, { useContext, useEffect, useState } from "react";
import MainCard from "../common/mainCard";
import { GlobalContext } from "@/context/GlobalContext";
import MainCardSkeleton from "../common/mainCardSkeleton";

const WishlistSection = () => {
  const { wishlist, fetchWishlist } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWishlist().then(() => setIsLoading(false));
  }, [fetchWishlist]);

  return (
    <>
      <section className="py-10">
        <div className="wrapper">
          <div className=" ">
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10">
                  <MainCardSkeleton />
                  <MainCardSkeleton />
                  <MainCardSkeleton />
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10">
                {wishlist &&
                  wishlist.map((item, index) => (
                    <MainCard key={index} item={item.hotel} {...item.hotel} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WishlistSection;

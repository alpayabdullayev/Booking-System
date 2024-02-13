import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const threshold = 200;
    if (window.pageYOffset > threshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      } fixed bottom-10 right-10 bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded cursor-pointer transition-opacity ease-in-out duration-500`}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </div>
  );
};

export default GoToTop;

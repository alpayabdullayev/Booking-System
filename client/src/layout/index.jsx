import React from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import GoToTop from "./GoToTop";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <GoToTop/>
    </>
  );
};

export default Layout;

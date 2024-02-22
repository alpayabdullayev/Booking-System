import React from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import GoToTop from "./GoToTop";
import toast, { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      <Outlet />
      <Footer />
      <GoToTop />
    </>
  );
};

export default Layout;

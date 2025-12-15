import React from "react";
import Navbar from "../Pages/Share/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Pages/Share/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;

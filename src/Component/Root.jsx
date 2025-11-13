import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import AosAnimation from "./AosAnimation";

const Root = () => {
  return (
    <div>
      <AosAnimation></AosAnimation>

      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Root;

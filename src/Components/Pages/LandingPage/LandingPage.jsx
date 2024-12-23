import React from "react";
import Footer from "../../Footer/Footer";
import { Outlet } from "react-router-dom";
import Header from "../../Header/Header";

function LandingPage() {
  return (
    <>
    <Header/>
      <Outlet />

      <Footer />
    </>
  );
}

export default LandingPage;

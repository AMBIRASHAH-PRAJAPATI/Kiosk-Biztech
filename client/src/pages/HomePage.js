import React from "react";
import Layout from "../components/Layout/Layout";
import "./Style/HomePage.css";
import HeroSection from "../components/HeroSection.js";
import Steps from "../components/Steps.js";
import BookNow from "../components/BookNow.js";
import Features from "../components/Features.js";
import LatestProduct from "../components/LatestProduct.js";

const HomePage = () => {
  return (
    <Layout title={"Kiosk Biztech - Best laptops"}>
      <HeroSection />
      <Features />
      <Steps />
      <LatestProduct />
      <BookNow />
    </Layout>
  );
};

export default HomePage;

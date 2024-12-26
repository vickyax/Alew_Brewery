// Dashboard.jsx
import React, { useState, useEffect } from "react";
import "../responsive.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Preloader from "../components/Pre";
import 'react-slideshow-image/dist/styles.css';
import { Zoom } from 'react-slideshow-image';
import Menu from "../components/Menu";
import Home from "../components/Home";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { toast } from 'react-toastify';
import "../styles/Dashboard.css";
import "../styles/index.css";
import "../style.css";
import a from "../assets2/beer3.gif";
import b from "../assets2/beer4.gif";
import c from "../assets2/beer1.jpg";
import d from "../assets2/beer2.jpg";
import ee from "../assets2/beer5.jpg";

const Dash = () => {
  

  const ImageSlideshow = () => {
    const images = [
      a,b,c,d,ee
    ];
  
    const zoomOutProperties = {
      duration: 1000,
      transitionDuration: 1000,
      infinite: true,
      indicators: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 300,
    };
  
    return (
      <div className="slide-container">
        <Zoom {...zoomOutProperties}>
          {images.map((each, index) => (
            <img key={index} style={{ width: "100%" ,height:"500px"}} src={each} alt={`Slide ${index}`} />
          ))}
        </Zoom>
      </div>
    );
  };
  
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [load, updateLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    

    return () => clearTimeout(timer);
  }, [token, navigate]);

  if (!token) {
    return null; // Render nothing while redirecting to avoid flash of the dashboard
  }

  return (
    <>
      <Preloader load={load} />
        <Navbar />
        <div className="dash">
        <ImageSlideshow />
      </div>
      <div className="Dashboard" id={load ? "no-scroll" : "scroll"}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default Dash;

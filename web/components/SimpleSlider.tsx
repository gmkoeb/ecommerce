'use client'
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SimpleSlider() {
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "absolute", right: "0", marginRight: "10px" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "absolute", left: "0", zIndex: "10", marginLeft: "10px" }}
        onClick={onClick}
      />
    );
  }
  
  const settings = {
    dots: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const sliderArray = ["apple", "headphones", "notebooks"]
  return (
    <div className="slider-container mt-10 mx-auto w-1/2">
      <Slider {...settings}>
        {sliderArray.map(value => (
          <div key={value}>
            <img className="w-full h-96 mx-auto rounded-lg shadow-md" src={`sliderImages/${value}.jpeg`} alt={`${value} products`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
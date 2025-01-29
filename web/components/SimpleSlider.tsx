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
    dots: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const sliderArray = [1, 2, 3, 4, 5]
  return (
    <div className="slider-container mt-10 mx-auto w-[70%]">
      <Slider {...settings}>
        {sliderArray.map(value => (
          <div key={value}>
            <img className="w-full h-96 mx-auto rounded-lg" src={`sliderImages/slider${value}.jpeg`} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
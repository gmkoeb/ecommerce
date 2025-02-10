'use client'
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "@/app/page";
import { CircleChevronLeft, CircleChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

function ProductSlider( { products }: { products: Product[] } ) {
  const { addToCart } = useCart();


  function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <CircleChevronRight
        className={className}
        color="gray"
        strokeWidth={0.5}
        fill="white"
        size={40}
        style={{ display: "absolute", right: "-50", marginRight: "10px" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props: any) {
    const { className, onClick } = props;
    return (
      <CircleChevronLeft
        className={className}
        color="gray"
        fill="white"
        strokeWidth={0.5} 
        size={40}
        style={{ display: "absolute", left: "-50", zIndex: "10", marginLeft: "10px" }}
        onClick={onClick}
      />
    );
  }
  
  const settings = {
    dots: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipe: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="slider-container mt-10 mx-32">
      <Slider {...settings}>
        {products.map(product => (
          <div className="flex bg-white rounded pt-2 mb-10 w-80" key={product.id}>
            <div className="flex flex-col items-center gap-4">
              <img className="w-44 h-32" src={`products/${product.category.toLocaleLowerCase()}.jpg`} alt="" />
              <div className="flex flex-col text-left gap-4">
                <h5 className="font-bold">{product.name} - {product.model}</h5>
                <div>
                  <p className="font-bold text-xl">${product.price}</p>
                  <p className="text-sm">or <span className="font-bold text-gray-500">12x ${Math.round(product.price/12)}</span></p>
                </div>
                <p>{product.model}</p>
              </div>
              <div
                onClick={() => addToCart(product)} 
                className="flex gap-3 text-white font-bold bg-orange-500 py-2 w-full items-center justify-center rounded-b hover:cursor-pointer hover:opacity-85 duration-300">
                <p>Add to cart</p>
                <ShoppingCart/>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductSlider;
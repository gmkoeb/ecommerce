'use client'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { ComponentProps } from 'react'
import Image from 'next/image'

function OfferSlider() {
  function SampleNextArrow(props: ComponentProps<'button'>) {
    const { className, style, onClick } = props
    return (
      <button
        type="button"
        className={className}
        style={{
          ...style,
          display: 'absolute',
          right: '0',
          marginRight: '10px',
        }}
        onClick={onClick}
      />
    )
  }

  function SamplePrevArrow(props: ComponentProps<'button'>) {
    const { className, style, onClick } = props
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
        style={{
          ...style,
          display: 'absolute',
          left: '0',
          zIndex: '10',
          marginLeft: '10px',
        }}
      />
    )
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
    prevArrow: <SamplePrevArrow />,
  }

  const sliderArray = ['apple', 'headphones', 'notebooks']
  return (
    <div className="slider-container mt-10 mx-auto w-1/2">
      <Slider {...settings}>
        {sliderArray.map(value => (
          <div key={value}>
            <Image
              width={600}
              height={400}
              className="mx-auto rounded-lg shadow-md"
              src={`/offerSliderImages/${value}.jpeg`}
              alt={`${value} products`}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default OfferSlider

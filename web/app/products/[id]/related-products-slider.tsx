'use client'

import type { Product } from '@/app/(home)/page'
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import Link from 'next/link'

function RelatedProductsSlider({ products }: { products: Product[] }) {
  function SampleNextArrow(props: any) {
    const { className, onClick } = props
    return (
      <CircleChevronRight
        className={className}
        color="gray"
        strokeWidth={0.5}
        fill="white"
        size={20}
        style={{ display: 'absolute', right: '-50', marginRight: '10px' }}
        onClick={onClick}
      />
    )
  }

  function SamplePrevArrow(props: any) {
    const { className, onClick } = props
    return (
      <CircleChevronLeft
        className={className}
        color="gray"
        fill="white"
        strokeWidth={0.5}
        size={20}
        style={{
          display: 'absolute',
          left: '-50',
          zIndex: '10',
          marginLeft: '10px',
        }}
        onClick={onClick}
      />
    )
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  return (
    <div className="slider-container w-[70%]">
      <Slider {...settings}>
        {products.map(product => (
          <div key={product.id}>
            <Link
              href={`/products/${product.id}`}
              className="flex flex-col items-center text-center font-bold"
            >
              <Image
                width={80}
                height={80}
                className="w-30 h-20"
                src={`/products/${product.name.split(' ').join('_').toLocaleLowerCase()}.png`}
                alt={`${product.name}`}
              />
              <p className="my-2">{product.name}</p>
              <p>${product.price}</p>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default RelatedProductsSlider

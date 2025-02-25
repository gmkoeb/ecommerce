'use client'
import type { ComponentProps } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { Product } from '@/app/(home)/page'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

function ProductSlider({ products }: { products: Product[] }) {
  function SampleNextArrow(props: ComponentProps<'button'>) {
    const { className, onClick } = props
    return (
      <button type="button" onClick={onClick}>
        <CircleChevronRight
          className={twMerge('!w-10 !h-10 z-10 -mr-5', className)}
          color="gray"
          strokeWidth={0.5}
          fill="white"
          size={40}
        />
      </button>
    )
  }

  function SamplePrevArrow(props: ComponentProps<'button'>) {
    const { className, onClick } = props
    return (
      <button type="button" onClick={onClick}>
        <CircleChevronLeft
          className={twMerge('!w-10 !h-10 z-10 -ml-4', className)}
          color="gray"
          fill="white"
          strokeWidth={0.5}
        />
      </button>
    )
  }

  const settings = {
    dots: false,
    speed: 500,
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
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="slider-container mt-10 mx-32">
      <Slider {...settings}>
        {products.map(product => (
          <div className="flex bg-white rounded pt-2 mb-10" key={product.id}>
            <Link
              href={`/products/${product.id}`}
              className="flex flex-col items-center gap-4"
            >
              <Image
                width={180}
                height={120}
                className="w-44 h-32"
                src={`/products/${product.name.split(' ').join('_').toLocaleLowerCase()}.png`}
                alt={`${product.name}`}
              />
              <div className="flex flex-col text-left gap-4">
                <h5 className="font-bold">
                  {product.name} - {product.model}
                </h5>
                <div>
                  <p className="font-bold text-xl">${product.price}</p>
                  <p className="text-sm">
                    or{' '}
                    <span className="font-bold text-gray-500">
                      12x ${Math.round(product.price / 12)}
                    </span>
                  </p>
                </div>
                <p>{product.model}</p>
              </div>
            </Link>
            <AddToCartButton
              product={product}
              className="flex gap-3 text-white font-bold bg-orange-500 py-2 w-full items-center justify-center rounded-b hover:cursor-pointer hover:opacity-85 duration-300 mt-2"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ProductSlider

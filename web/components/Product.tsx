'use client'

import type { Product } from '@/app/page'
import { useCart } from '@/context/CartContext'
import { api } from '@/lib/axios'
import { NotebookText, ShoppingCart, Tag, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'
import RelatedProductsSlider from './RelatedProductsSlider'

interface ProductParams {
  id: string
}

interface ProductDetails extends Product {
  company: {
    brand_name: string
    full_address: string
    state: string
    city: string
    email: string
  }
}
export default function ProductDetails({ id }: ProductParams) {
  const [product, setProduct] = useState<ProductDetails>({
    id: 0,
    name: '',
    category: '',
    price: 0,
    model: '',
    description: '',
    quantity: 0,
    company: {
      brand_name: '',
      full_address: '',
      state: '',
      city: '',
      email: '',
    },
  })

  const [products, setProducts] = useState<ProductDetails[]>([])

  const { addToCart } = useCart()

  async function getProductDetails(id: string) {
    const data = await api.get(`/products/${id}`)
    setProduct(data.data.product)
  }

  async function getProducts() {
    const response = await api.get('/products')
    setProducts(response.data.products)
  }

  useEffect(() => {
    getProductDetails(id)
    getProducts()
  }, [])

  return (
    <div>
      <div className="grid grid-cols-4 h-[65vh]">
        <div className="text-center col-span-2 mt-10">
          <h3 className="text-3xl font-bold">
            {product?.name} - {product?.model}
          </h3>
          <p className="mt-5">{product?.company.brand_name}</p>
          <img
            className="w-1/3 mx-auto mt-10 rounded-lg"
            src={`${product?.name.split(' ').join('_').toLocaleLowerCase()}.png`}
            alt={`${product?.name}`}
          />
        </div>
        <div className="mt-20 col-span-2 h-full border-gray-400">
          <section className="flex gap-2">
            <Truck fill="orange"></Truck>
            <h3 className="text-lg">
              Sold and delivered by {product?.company.brand_name}
            </h3>
          </section>
          {product?.price && (
            <section>
              <p className="text-orange-500 font-bold text-5xl">
                ${product?.price}
              </p>
              <p className="font-bold text-gray-500">
                or 12x ${Math.round(product?.price / 12)}
              </p>
            </section>
          )}
          <section>
            <div
              onClick={() => addToCart(product)}
              className="flex gap-3 text-white font-bold bg-orange-500 py-2 w-1/3 items-center justify-center rounded-lg hover:cursor-pointer hover:opacity-85 duration-300 mt-2"
            >
              <p>Add to cart</p>
              <ShoppingCart />
            </div>
          </section>
          <section>
            <div className="flex ml-1.5 mt-10 text-lg font-bold mb-5 gap-2">
              <Tag fill="orange" color="rgb(229 229 229)" />
              <h3>Related Products</h3>
            </div>
            <RelatedProductsSlider products={products} />
          </section>
        </div>
      </div>
      <section className="flex flex-col gap-2 mx-40 border-t border-black">
        <div className="flex my-5">
          <NotebookText fill="orange" className="mt-1.5 mr-2" />
          <h3 className="text-3xl font-bold">Product Description</h3>
        </div>
        <div>
          <p>
            {product.description}
            {product.description}
            {product.description}
            {product.description}
            {product.description}
            {product.description}
            {product.description}
            {product.description}
            {product.description}
            {product.description}
            {product.description}
            {product.description}
            {product.description}
            {product.description}
          </p>
        </div>
      </section>
    </div>
  )
}

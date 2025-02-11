'use client'
import OfferSlider from "@/components/OfferSlider";
import ProductSlider from "@/components/ProductSlider";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

export interface Product {
  id: number,
  name: string,
  category: string,
  price: number,
  model: string,
  description: string,
  quantity: number
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  async function getProducts(){
    const response = await api.get('/products')
    setProducts(response.data.products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <div className="bg-gradient-to-b from-violet-400 to-neutral-200 p-5 mx-32">
        <OfferSlider />
      </div>
      <ProductSlider products={products}/>
    </div>
  );
}

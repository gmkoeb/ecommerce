"use client"

import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { Product } from "@/app/page"

interface ProductParams{
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
export default function ProductDetails( {id}: ProductParams ) {
  const [product, setProduct] = useState<ProductDetails>()
  async function getProductDetails(id: string){
    const data = await api.get(`/products/${id}`)
    setProduct(data.data.product)
  }

  useEffect(() => {
    getProductDetails(id)
  }, [])

  return(
    <div className="grid grid-cols-3 h-[65vh]">
      <div className="text-center col-span-2 mt-10">
        <h3 className="text-lg font-bold">{product?.name} - {product?.model}</h3>
        <img className="w-1/2 mx-auto mt-10 rounded-lg" src={`${product?.name.split(" ").join("_").toLocaleLowerCase()}.png`} alt={`${product?.name}`} />
      </div>
      <div className="text-center mt-10 border-l h-full border-gray-400">
        <h2 className="text-2xl font-bold">Seller</h2>
        <h3>{product?.company.brand_name}</h3>
        <p>{product?.company.full_address}</p>
      </div>
    </div>
  )
}
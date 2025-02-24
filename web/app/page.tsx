import OfferSlider from '@/components/OfferSlider'
import ProductSlider from '@/components/ProductSlider'
import { api } from '@/lib/axios'

export interface Product {
  id: number
  name: string
  category: string
  price: number
  model: string
  description: string
  quantity: number
}

interface GetProductsResponse {
  products: Product[]
}

export default async function Home() {
  const response = await api.get<GetProductsResponse>('/products')
  const { products } = response.data

  return (
    <div>
      <div className="bg-gradient-to-b from-violet-400 to-neutral-200 p-5 mx-32">
        <OfferSlider />
      </div>
      <ProductSlider products={products} />
    </div>
  )
}

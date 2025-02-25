import type { Product } from '@/app/(home)/page'
import { api } from '@/lib/axios'
import Image from 'next/image'
import { ProductDescription } from './product-description'
import { ProductSaleInfo } from './product-sale-info'
import { RelatedProducts } from './related-products'

interface ProductParams {
  id: string
}

export interface ProductDetails extends Product {
  company: {
    brand_name: string
    full_address: string
    state: string
    city: string
    email: string
  }
}

interface ProductDetailsRoute {
  product: ProductDetails
}

interface ProductsRoute {
  products: ProductDetails[]
}

export default async function ProductDetails({ id }: ProductParams) {
  async function getProductDetails(id: string) {
    const { data } = await api.get<ProductDetailsRoute>(`/products/${id}`)
    return data
  }

  async function getProducts() {
    const { data } = await api.get<ProductsRoute>('/products')
    return data
  }

  const { product } = await getProductDetails(id)
  const { products } = await getProducts()

  return (
    <div>
      <div className="grid grid-cols-4 h-[65vh]">
        <div className="text-center col-span-2 mt-10">
          <h3 className="text-3xl font-bold">
            {product?.name} - {product?.model}
          </h3>
          <p className="mt-5">{product?.company.brand_name}</p>
          <Image
            width={400}
            height={300}
            className="mx-auto mt-10 rounded-lg"
            src={`/products/${product?.name.split(' ').join('_').toLocaleLowerCase()}.png`}
            alt={`${product?.name}`}
          />
        </div>
        <div className="mt-20 col-span-2 h-full border-gray-400">
          <ProductSaleInfo product={product} />
          <RelatedProducts products={products} />
        </div>
      </div>
      <ProductDescription product={product} />
    </div>
  )
}

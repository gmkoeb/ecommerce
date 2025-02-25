import { AddToCartButton } from '@/components/add-to-cart-button'
import { Truck } from 'lucide-react'
import type { ProductDetails } from './product-details'

interface ProductPriceProps {
  product: ProductDetails
}

export function ProductSaleInfo({ product }: ProductPriceProps) {
  return (
    <section>
      <h3 className="text-lg flex gap-2">
        <Truck fill="orange" />
        Sold and delivered by {product?.company.brand_name}
      </h3>
      <p className="text-orange-500 font-bold text-5xl">${product?.price}</p>
      <p className="font-bold text-gray-500">
        or 12x ${Math.round(product?.price / 12)}
      </p>
      <AddToCartButton
        className="flex gap-3 text-white font-bold bg-orange-500 py-2 w-1/3 items-center justify-center rounded-lg hover:cursor-pointer hover:opacity-85 duration-300 mt-2"
        product={product}
      />
    </section>
  )
}

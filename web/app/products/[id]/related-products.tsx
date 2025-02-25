import type { Product } from '@/app/(home)/page'
import { Tag } from 'lucide-react'
import RelatedProductsSlider from './related-products-slider'

interface RelatedProductsProps {
  products: Product[]
}
export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section>
      <div className="flex ml-1.5 mt-10 text-lg font-bold mb-5 gap-2">
        <Tag fill="orange" color="rgb(229 229 229)" />
        <h3>Related Products</h3>
      </div>
      <RelatedProductsSlider products={products} />
    </section>
  )
}

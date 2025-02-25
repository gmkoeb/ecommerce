import type { Product } from '@/app/(home)/page'
import { NotebookText } from 'lucide-react'
interface ProductDescriptionProps {
  product: Product
}
export function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <section className="flex flex-col gap-2 mx-40 border-t border-black">
      <div className="flex my-5">
        <NotebookText fill="orange" className="mt-1.5 mr-2" />
        <h3 className="text-3xl font-bold">Product Description</h3>
      </div>
      <div>
        <p>{product.description}</p>
      </div>
    </section>
  )
}

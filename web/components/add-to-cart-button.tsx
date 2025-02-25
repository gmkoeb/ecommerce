'use client'

import type { Product } from '@/app/(home)/page'
import { useCart } from '@/context/CartContext'
import { ShoppingCart } from 'lucide-react'
import type { ComponentProps } from 'react'

interface AddToCartButton extends ComponentProps<'button'> {
  product: Product
}
export function AddToCartButton({ product, ...props }: AddToCartButton) {
  const { addToCart } = useCart()
  return (
    <div
      onClick={() => addToCart(product)}
      onKeyDown={() => addToCart(product)}
      className={props.className}
    >
      <p>Add to cart</p>
      <ShoppingCart />
    </div>
  )
}

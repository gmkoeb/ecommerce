'use client'
import { Product } from "@/app/(home)/page";
import { createContext, useContext, useEffect, useState } from "react";


type CartContextType = {
  cart: Product[],
  addToCart: (product: Product) => void,
  removeOneFromCart: (product: Product) => void,
  removeFromCart: (id: number) => void,
  removeAll: () => void,
  cartCounter: number
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  removeOneFromCart: () => {},
  removeAll: () => {},
  cartCounter: 0
})

export default function CartProvider({ children }: any){
  const [cart, setCart] = useState<Product[]>([])
  const [cartCounter, setCartCounter] = useState<number>(0)

  useEffect(() => {
    const storedCart: [] = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(storedCart)
    setCartCounter(storedCart.length)
  }, [])

  useEffect(() =>{
    localStorage.setItem("cart", JSON.stringify(cart))
    setCartCounter(cart.length)
  }, [cart])

  function addToCart(product: Product){
    setCart((prevCart: Product[]) => {
      const existingProduct = prevCart.find((p) => p.id === product.id)
      if(existingProduct){
        return prevCart.map(
          (p) => p.id === product.id ? {...p, quantity: p.quantity + 1} : p
        )}
        return [...prevCart, {...product, quantity: 1}] 
    })
  }
  
  function removeFromCart(id: number){
    setCart((prevCart) => prevCart.filter((p) => p.id !== id))
  }

  function removeOneFromCart(product: Product){
    if(product.quantity === 1){
      removeFromCart(product.id)
    }
    setCart((prevCart: Product[]) => {
      return prevCart.map(
        (p) => p.id === product.id ? {...p, quantity: p.quantity - 1} : p
      )}
  )}

  function removeAll(){
    setCart([])
  }
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCounter, removeOneFromCart, removeAll }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

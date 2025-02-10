'use client'
import { Product } from "@/app/page";
import { createContext, useContext, useEffect, useState } from "react";


type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
})

export default function CartProvider({ children }: any){
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const storedCart: [] = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(storedCart)
  }, [])

  useEffect(() =>{
    localStorage.setItem("cart", JSON.stringify(cart))
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

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

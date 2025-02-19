import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Cart(){
  const { cart, addToCart, removeOneFromCart, removeAll } = useCart()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(0)
    cart.map((product) => setTotal((prevTotal: number) => prevTotal + product.price * product.quantity))
  }, [cart])

  return(
    <div className="px-2 border border-gray-400 rounded-md bg-white absolute mt-14 w-96 max-h-96 text-center right-4 text-black overflow-auto">
      <h2 className="mb-2 font-bold text-lg">My Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((product) => (
            <div className="grid grid-cols-2 border-b mb-4 items-center" key={product.id}>
              <div className="flex items-center gap-2">
                <img width={60} src={`products/${product.name.split(" ").join("_").toLocaleLowerCase()}.png`} alt={`${product.name}`} />
                <h3>{product.name} - {product.model}</h3>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex justify-center gap-2 border w-fit mx-auto px-5">
                    <Minus className="hover:cursor-pointer" onClick={() => removeOneFromCart(product)} strokeWidth={2.7} width={20}/> 
                      {product.quantity} 
                    <Plus className="hover:cursor-pointer" width={20} strokeWidth={2.7} onClick={() => addToCart(product)}/>
                  </div>
                </div>
                <p>Price: {product.quantity * product.price}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-center items-center gap-4 mb-2">
            <p>Total: ${total}</p>
            <button className="hover: cursor-pointer font-bold flex items-center gap-2 border p-1 text-sm hover rounded hover:bg-red-500 duration-300" onClick={removeAll}>Empty Cart <Trash2 size={20}/></button>
          </div>
        </>
      )}
    </div>
  )
}
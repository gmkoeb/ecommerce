import { useCart } from "@/context/CartContext";

export default function Cart(){
  const { cart, removeFromCart } = useCart()

  return(
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => removeFromCart(product.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  )
}
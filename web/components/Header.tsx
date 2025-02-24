'use client'
import { useCart } from '@/context/CartContext'
import Cookies from 'js-cookie'
import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cart from './Cart'

export default function Header() {
  const router = useRouter()
  const [userName, setUsername] = useState('')
  const { cartCounter } = useCart()
  const [cartClicked, setCartClicked] = useState<boolean>(false)

  async function handleLogout() {
    Cookies.remove('token')
    Cookies.remove('userName')
    router.refresh()
    location.reload()
  }

  useEffect(() => {
    const name = Cookies.get('userName')
    if (name) {
      const splittedName = name.split(' ')
      if (splittedName.length >= 3) {
        setUsername(splittedName.splice(0, 2).join(' '))
      } else {
        setUsername(name)
      }
    }
  }, [])

  return (
    <header className="pb-10 mb-14">
      <nav className="flex justify-between py-4 bg-violet-600 text-neutral-200 fixed w-full z-20 items-center">
        <Link
          href={'/'}
          className="font-heading font-semibold text-4xl mx-10 tracking-wide"
        >
          Ecommerce<span className="text-lg">.com.br</span>
        </Link>
        <input
          type="text"
          className="w-3/4 rounded-lg py-2 px-4"
          placeholder="Search Ecommerce.com.br"
        />
        <div className="flex gap-4 mr-4 items-center">
          {userName ? (
            <div className="flex flex-col ml-5">
              <h5 className="text-center font-bold w-32">{userName}</h5>
              <button
                type="button"
                className="hover:underline"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                className="p-2 rounded-lg text-md hover:opacity-80 duration-300 text-center font-bold"
                href={'/sign_in'}
              >
                Sign in to your account
              </Link>
            </>
          )}
          <div className="relative mt-4 text-sm">
            <div
              className="fixed right-10 bg-red-500 rounded-full px-2 font-bold hover:cursor-pointer"
              onKeyDown={() =>
                cartClicked ? setCartClicked(false) : setCartClicked(true)
              }
              onClick={() =>
                cartClicked ? setCartClicked(false) : setCartClicked(true)
              }
            >
              {cartCounter}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <ShoppingBasket
              onClick={() =>
                cartClicked ? setCartClicked(false) : setCartClicked(true)
              }
              className="hover:cursor-pointer"
              size={50}
              strokeWidth={1}
            />
            {cartClicked && <Cart />}
          </div>
        </div>
      </nav>
    </header>
  )
}

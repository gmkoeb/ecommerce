'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import Cart from "./Cart";

export default function Header(){
  const [userName, setUsername] = useState('')

  useEffect(() => {
    const name = Cookies.get('userName')
    if (name){
      const splittedName = name.split(' ')
      if (splittedName.length >= 3){
        setUsername(splittedName.splice(0, 2).join(' '))
      } else {
        setUsername(name)
      }
    }

  }, [])
  return(
    <header className="pb-10">
      <nav className="flex justify-between py-4 bg-violet-600 font-bold items-center text-neutral-200 fixed w-full z-20">
        <Link href={'/'} className="font-bold text-3xl mx-10">Ecommerce<span className="text-lg">.com.br</span></Link>
        <input type="text" className="w-3/4 rounded-lg py-2 px-4" placeholder="Search Ecommerce.com.br" />
        <div className="flex gap-4 mr-4 items-center">
          {userName ? 
            <>
              <h5 className="text-center">{userName}</h5> 
            </>
          :
            <>
              <Link className="p-2 rounded-lg text-md hover:opacity-80 duration-300 text-center" href={'/sign_in'}>Sign in to your account</Link>
            </>
          }
          <Cart></Cart>
        </div>
      </nav>
    </header>
  )
}
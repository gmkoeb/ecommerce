import Link from "next/link";

export default function Header(){
  return(
    <header>
      <nav className="flex justify-between py-4 bg-neutral-300 font-bold items-center">
        <Link href={'/'} className="text-slate-600 font-bold text-3xl ml-10">Ecommerce<span className="text-lg">.com.br</span></Link>
        <input type="text" className="w-3/4 rounded-lg py-2 px-4" placeholder="Search Ecommerce.com.br" />
        <div className="flex gap-4 mr-4 text-white items-center">
          <Link className="p-2 bg-blue-700 rounded-lg hover:opacity-80 duration-300" href={'/sign_in'}>Sign in</Link>
          <Link className="hover:opacity-60 duration-300 text-black" href={'/sign_up'}>Sign up</Link>
        </div>
      </nav>
    </header>
  )
}
import Link from 'next/link'
import { SignInForm } from './sign-in-form'
import Image from 'next/image'
import signInCover from '../../assets/signincover.jpg'
export default function SignUp() {
  return (
    <div className="grid grid-cols-2 w-full">
      <div className="flex">
        <Image
          src={signInCover}
          alt="Electronic items"
          className="h-[85dvh] mt-2 rounded-lg ml-10 mr-96"
        />
        <p className="mt-10 absolute w-max right-0 mx-20">
          Don't have an account?{' '}
          <Link className="font-bold" href={'/sign_up'}>
            Sign up
          </Link>
        </p>
      </div>
      <SignInForm />
    </div>
  )
}

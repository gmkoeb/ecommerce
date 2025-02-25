import { SignUpForm } from './sign-up-form'
import signUpCover from '../../assets/signupcover.jpg'
import Image from 'next/image'
export default function SignUp() {
  return (
    <div className="grid grid-cols-2 w-full">
      <Image
        src={signUpCover}
        alt="Electronic products"
        className="h-[85dvh] mt-2 rounded-lg ml-10"
      />
      <SignUpForm />
    </div>
  )
}

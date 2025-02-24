import { SignUpForm } from './sign-up-form'

export default function SignUp() {
  return (
    <div className="grid grid-cols-2 w-full">
      <img
        src="signupcover.jpg"
        alt="Electronic products"
        className="h-[85vh] mt-2 rounded-lg ml-10"
      />
      <SignUpForm />
    </div>
  )
}

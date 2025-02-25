import {
  ErrorMessage,
  Field,
  type FormikErrors,
  type FormikTouched,
} from 'formik'
import type { ComponentProps } from 'react'

interface FormValues {
  name: string | null
  email: string
  password: string
  confirm_password: string | null
}

interface FormInput extends ComponentProps<'input'> {
  inputFor: string
  errors: FormikErrors<FormValues>
  touched: FormikTouched<FormValues>
}

export function FormInput({ inputFor, errors, touched, ...props }: FormInput) {
  return (
    <div className="w-1/2 flex flex-col">
      <div className="flex justify-between">
        <label className="capitalize" htmlFor={inputFor}>
          {inputFor.split('_').join(' ')}
        </label>
        <ErrorMessage
          className="text-red-500 font-bold"
          name={inputFor}
          component={'div'}
        />
      </div>
      <Field
        className={
          errors[inputFor as keyof FormValues] &&
          touched[inputFor as keyof FormValues]
            ? 'bg-neutral-100 border border-red-500 rounded-lg p-2'
            : 'bg-neutral-100 border border-white rounded-lg p-2'
        }
        name={inputFor}
        type={
          inputFor === 'name'
            ? 'text'
            : inputFor === 'email'
              ? 'email'
              : 'password'
        }
        placeholder={props.placeholder}
      />
    </div>
  )
}

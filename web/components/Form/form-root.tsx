import { Form, type FormikFormProps, type FormikHelpers } from 'formik'
import { FormErrors } from './form-errors'

export interface FormValues {
  name?: string
  email: string
  password: string
  confirm_password?: string
}

interface FormRootProps extends FormikFormProps {
  initialValues: FormValues
  formType: string
  apiErrors: string[]
  handleSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void
}

export function FormRoot({
  handleSubmit,
  initialValues,
  formType,
  apiErrors,
  ...props
}: FormRootProps) {
  return (
    <Form
      className="flex flex-col mt-20 justify-center gap-6 text-left ml-40"
      {...props}
    >
      <FormErrors apiErrors={apiErrors} />
      <h1 className="text-5xl text-left font-bold">{formType}</h1>
      {props.children}
      <button
        className="w-1/2 bg-blue-500 text-white py-2 rounded-full text-lg"
        type="submit"
      >
        {formType}
      </button>
    </Form>
  )
}

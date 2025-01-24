'use client'
import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import { api } from "../lib/axios";
import { AxiosResponse } from "axios";

interface SignUpFormValues {
  name: string,
  email: string,
  password: string,
  confirm_password: string
}

export default function SignUp() {
  const initialValues: SignUpFormValues = {
    email: '',
    name: '',
    password: '',
    confirm_password: ''
  }

  async function handleSubmit(values: SignUpFormValues, actions: FormikHelpers<SignUpFormValues>){
    try {
      const userData = { 
        user: {
          email: values.email,
          password: values.password,
          name: values.name
        }

      }
      const response = await api.post<AxiosResponse>('/sign_up', userData)
      console.log(response)
      actions.setSubmitting(false)
    } catch (error: any) {
      console.log(error.response.data.error)

    }
  }

  return(
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        validate={(values: SignUpFormValues) => {
          const errors: FormikErrors<SignUpFormValues> = {}
          if (!values.name){
            errors.name = "Required"
          }

          if (!values.email){
            errors.email = "Required"
          }

          if (!values.password){
            errors.password = "Required"
          }

          if (!values.confirm_password){
            errors.confirm_password = "Required"
          } else if (values.confirm_password != values.password){
            errors.confirm_password = "Password confirmation and password must be equal."
          }

          return errors
        }}
      >
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" type="text" placeholder="Type your name..."></Field>
            <ErrorMessage name="name"></ErrorMessage>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="text" placeholder="Type your email..."></Field>
            <ErrorMessage name="email"></ErrorMessage>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" placeholder="Type your password..."></Field>
            <ErrorMessage name="password"></ErrorMessage>
          </div>
          <div>
            <label htmlFor="confirm_password">Confirm Password</label>
            <Field id="confirm_password" name="confirm_password" type="password" placeholder="Confirm Password"></Field>
            <ErrorMessage name="confirm_password"></ErrorMessage>
          </div>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  )
}

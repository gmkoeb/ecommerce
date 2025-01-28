'use client'
import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import { api } from "../lib/axios";
import { AxiosResponse } from "axios";
import { useState } from "react";

interface SignInFormValues {
  email: string,
  password: string,
}

export default function SignUp() {
  const [authenticationError, setAuthenticationError] = useState('')
  const initialValues: SignInFormValues = {
    email: '',
    password: ''
  }

  async function handleSubmit(values: SignInFormValues, actions: FormikHelpers<SignInFormValues>){
    try {
      const userData = { 
        user: {
          email: values.email,
          password: values.password,
        }

      }
      const response = await api.post<AxiosResponse>('/sign_in', userData)
      console.log(response)
      actions.setSubmitting(false)
    } catch (error: any) {
      setAuthenticationError(error.response.data.error)
    }
  }

  return(
    <div className="grid grid-cols-2 w-full">
      <img src="signincover.webp" alt="Cartoon picture of things related to shopping" className="h-[98vh] mt-2 rounded-lg ml-10 w-[85%]"/>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        validate={(values: SignInFormValues) => {
          const errors: FormikErrors<SignInFormValues> = {}
          if (!values.email){
            errors.email = "Required"
          }

          if (!values.password){
            errors.password = "Required"
          }

          return errors
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col mt-20 justify-center gap-6 text-left ml-40">
            <h1 className="text-5xl text-left font-bold">Sign in</h1>
            <div className="w-1/2 flex flex-col">
              <div className="flex justify-between">
                <label htmlFor="email">Email</label>
                <ErrorMessage className="text-red-500 font-bold" name="email" component={'div'}></ErrorMessage>
              </div>
              <Field 
                className={
                  errors.email && touched.email ? 
                  "bg-neutral-100 border border-red-500 rounded-lg p-2" : 
                  "bg-neutral-100 rounded-lg p-2"
                }  
                id="email" 
                name="email" 
                type="text" 
                placeholder="Type your email...">

              </Field>
            </div>
            <div className="w-1/2 flex flex-col">
              <div className="flex justify-between">
                <label htmlFor="password">Password</label>
                <ErrorMessage className="text-red-500 font-bold" name="password" component={'div'}></ErrorMessage>
              </div>
              <Field className={
                  errors.password && touched.password ? 
                  "bg-neutral-100 border border-red-500 rounded-lg p-2" : 
                  "bg-neutral-100 rounded-lg p-2"
                }  
                id="password" 
                name="password" 
                type="password" 
                placeholder="Type your password...">
              </Field>
            </div>
            <div>
              <p className="text-red-500 font-bold">{authenticationError}</p>
            </div>
            <button className="w-1/2 bg-blue-500 text-white py-2 rounded-full text-lg" type="submit">Sign In</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

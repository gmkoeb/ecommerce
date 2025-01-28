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
    <div className="grid grid-cols-2 w-full">
      <img src="signupcover.jpeg" alt="Cartoon picture of bags and products" className="h-[98vh] mt-2 rounded-lg ml-10 w-[85%]"/>
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
        {({ errors, touched }) => (
          <Form className="flex flex-col mt-20 justify-center gap-6 text-left ml-40">
            <h1 className="text-5xl text-left font-bold">Sign up</h1>
            <div className="w-1/2 flex flex-col">
              <div className="flex justify-between">
                <label htmlFor="name">Name</label>
                <ErrorMessage className="text-red-500 font-bold" name="name" component={'div'}></ErrorMessage>
              </div>
              <Field 
                className={
                  errors.name && touched.name ? 
                  "bg-neutral-100 border border-red-500 rounded-lg p-2" : 
                  "bg-neutral-100 border border-white rounded-lg p-2"
                }  
                id="name" 
                name="name" 
                type="text" 
                placeholder="Type your name...">
              </Field>
            </div>
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
            <div className="w-1/2 flex flex-col">
              <div className="flex justify-between">
                <label htmlFor="confirm_password">Confirm Password</label>
                <ErrorMessage className="text-red-500 font-bold text-center" name="confirm_password" component={'div'}></ErrorMessage>
              </div>
              <Field 
                className={
                  errors.confirm_password && touched.confirm_password ? 
                  "bg-neutral-100 border border-red-500 rounded-lg p-2" : 
                  "bg-neutral-100 rounded-lg p-2"
                } 
                id="confirm_password" name="confirm_password" 
                type="password" 
                placeholder="Confirm Password">
              </Field>
            </div>
            <button className="w-1/2 bg-blue-500 text-white py-2 rounded-full text-lg" type="submit">Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

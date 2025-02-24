'use client'

import { FormInput } from '@/components/form-input'
import { FormRoot, type FormValues } from '@/components/form-root'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { Formik, type FormikErrors, type FormikHelpers } from 'formik'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ApiResponse {
  user: {
    name: string
    token: string
  }
}

export function SignInForm() {
  const router = useRouter()
  useEffect(() => {
    if (Cookies.get('userName')) {
      router.push('/')
    }
  })

  const [authenticationErrors, setAuthenticationErrors] = useState<string[]>([])
  const initialValues: FormValues = {
    email: '',
    password: '',
  }

  async function handleSubmit(
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) {
    try {
      const userData = {
        user: {
          email: values.email,
          password: values.password,
        },
      }
      const response = await api.post<ApiResponse>('/sign_in', userData)
      actions.setSubmitting(false)
      Cookies.set('userName', response.data.user.name)
      Cookies.set('token', response.data.user.token)
      router.refresh()
      location.reload()
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setAuthenticationErrors(error.response?.data.errors)
      }
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
      validate={(values: FormValues) => {
        const errors: FormikErrors<FormValues> = {}
        if (!values.email) {
          errors.email = 'Required'
        }

        if (!values.password) {
          errors.password = 'Required'
        }

        return errors
      }}
    >
      {({ errors, touched }) => (
        <FormRoot
          initialValues={initialValues}
          apiErrors={authenticationErrors}
          formType="Sign In"
          handleSubmit={handleSubmit}
        >
          <FormInput errors={errors} touched={touched} inputFor="email" />
          <FormInput errors={errors} touched={touched} inputFor="password" />
        </FormRoot>
      )}
    </Formik>
  )
}

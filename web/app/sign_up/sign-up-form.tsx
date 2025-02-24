'use client'

import { FormInput } from '@/components/form-input'
import { FormRoot, type FormValues } from '@/components/form-root'
import { api } from '@/lib/axios'
import { AxiosError, type AxiosResponse } from 'axios'
import { Formik, type FormikErrors, type FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SignUpForm() {
  const [apiErrors, setApiErrors] = useState<string[]>([])

  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  }

  const router = useRouter()

  async function handleSubmit(
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) {
    const userData = {
      user: {
        email: values.email,
        password: values.password,
        name: values.name,
      },
    }
    try {
      await api.post<AxiosResponse>('/sign_up', userData)
      actions.setSubmitting(false)
      router.refresh()
      router.push('/sign_in')
    } catch (error: unknown) {
      actions.setSubmitting(false)
      if (error instanceof AxiosError) {
        setApiErrors(error.response?.data.errors)
      }
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        await handleSubmit(values, actions)
        actions.setSubmitting(false)
      }}
      validate={values => {
        const errors: FormikErrors<FormValues> = {}
        if (!values.name) {
          errors.name = 'Required'
        }

        if (!values.email) {
          errors.email = 'Required'
        }

        if (!values.password) {
          errors.password = 'Required'
        }

        if (!values.confirm_password) {
          errors.confirm_password = 'Required'
        } else if (values.confirm_password !== values.password) {
          errors.confirm_password =
            'Password confirmation and password must be equal.'
        }

        return errors
      }}
    >
      {({ errors, touched }) => (
        <FormRoot
          handleSubmit={handleSubmit}
          formType="Sign Up"
          apiErrors={apiErrors}
          initialValues={initialValues}
        >
          <FormInput
            errors={errors}
            touched={touched}
            inputFor={'name'}
            placeholder="Type your name..."
          />
          <FormInput
            errors={errors}
            touched={touched}
            inputFor={'email'}
            placeholder="Type your email..."
          />
          <FormInput
            errors={errors}
            touched={touched}
            inputFor={'password'}
            placeholder="Type your password..."
          />
          <FormInput
            errors={errors}
            touched={touched}
            inputFor={'confirm_password'}
            placeholder="Confirm password..."
          />
        </FormRoot>
      )}
    </Formik>
  )
}

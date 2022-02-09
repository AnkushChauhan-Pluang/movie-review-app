import FormField from '@components/common/FormField'
import Link from '@components/common/Link'
import Button from '@components/ui/Button'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { LoginSchema } from 'utils/validationSchema'

const LoginView = () => {
  const [error, setError] = useState('')
  const initialValues = {
    email: '',
    password: '',
  }

  const login = async (values) => {
    try {
      setError('')
      console.log(values)
    } catch (e) {
      //   setError(e.response.data.message)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      validateOnMount
      onSubmit={login}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="mx-auto flex w-80 flex-col gap-5">
          <FormField type="email" name="email" placeholder="Email" />
          <FormField type="password" name="password" placeholder="Password" />
          <Button type="submit" disabled={isSubmitting || !isValid}>
            Log In
          </Button>
          <div className="text-center text-red-600">{error}</div>
          <div className="">
            <p>
              Don't have an account?{' '}
              <span>
                <Link href="/signup" className="font-bold hover:opacity-70">
                  Sign Up
                </Link>
              </span>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LoginView
